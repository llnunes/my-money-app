import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { init } from './billingCycleActions'
import LabelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component{

    calculaSummary () {
        const sum = (t, v) => t + v 
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)           
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props    
        const { sumOfCredits, sumOfDebts } = this.calculaSummary() 

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name'  component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome'/>
                    <Field name='month' component={LabelAndInput} readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês' type='number'/>
                    <Field name='year'  component={LabelAndInput} readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o nome' type='number'/>
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />
                    <ItemList list={credits} readOnly={readOnly} cols='12 6' 
                        field='credits' legend='Créditos' />
                    <ItemList list={debts} readOnly={readOnly} cols='12 6' 
                        field='debts' legend='Débitos' showStatus={true} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}                    
                    </button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')

const mapStateToProps = state => ({
        credits: selector(state, 'credits'),
        debts: selector(state, 'debts')
    })
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)
