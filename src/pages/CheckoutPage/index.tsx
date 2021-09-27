import React from 'react'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FormikProvider,
    useFormik,
} from 'formik'
import * as Yup from 'yup';

import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router';

import styles from './style.scss'

import { Input, Select, SelectOption, Checkbox } from '../../components/FormInputs'
import { Button } from '../../components/Button'
import { H2 } from '../../components/Typography';


interface Address {
    firstName: string
    lastName: string
    streetAddress: string
    apartment: string
    postCode: string
    country: string
}
interface CheckoutForm {
    shippingAddress: Address
    billingAddress?: Address
    sameAddress: boolean
    phoneNumber: string
}

const AddressSchema = {
    firstName: Yup.string()
        .required("Required field")
        .matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field "),
    lastName: Yup.string()
        .required("Required field")
        .matches(/^[aA-zZ]+$/, "Only alphabets are allowed for this field "),
    streetAddress: Yup.string()
        .required("Required field")
        .matches(/^[aA-zZ\s1-9\-]+$/, "Only numbers, spaces, dashes, letters are allowed for this field"),
    postCode: Yup.string()
        .required("Required field"),
    country: Yup.string()
        .required("Required field")
}

const CheckoutFormSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape(AddressSchema),
    sameAddress: Yup.boolean(),
    billingAddress: Yup.object().when('sameAddress', {
        is: false,
        then: Yup.object().shape(AddressSchema)
    })
})

const COUNTRIES_LIST: SelectOption[] = [
    { label: 'United States of America', value: 'USA' },
    { label: 'Russia', value: 'RU' }
]

interface AddressFormProps {
    name: 'shippingAddress' | 'billingAddress'
    title: string
}

function AddressForm(props: AddressFormProps) {
    const { name, title } = props
    return (
        <div className={styles.addressForm}>
            <H2>{title}</H2>
            <div className={styles.row}>
                <div className={styles.cell1}>
                    <Input name={`${name}.firstName`} label="First name" />
                </div>
                <div className={styles.cell1}>
                    <Input name={`${name}.lastName`} label="Last name" />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.cell2}>
                    <Input name={`${name}.streetAddress`} label="Street address" />
                </div>
                <div className={styles.cell1}>
                    <Input name={`${name}.apartment`} label="Apt/Suite (Optional)" />
                </div>
            </div>

            {/* TODO: col-* grid */}
            <div className={styles.row}>
                <div className={styles.cell2}>
                    <div className={styles.row}>
                        <div className={styles.cell1}>
                            <Input name={`${name}.postCode`} label="ZIP code" />
                        </div>
                        <div className={styles.cell1}>
                            <Select name={`${name}.country`} options={COUNTRIES_LIST} label="Country" ></Select>
                        </div>
                    </div>
                </div>

                <div className={styles.cell1}>
                    <Select name={`${name}.country`} options={COUNTRIES_LIST} label="Country" ></Select>
                </div>
            </div>
        </div>
    )
}

export function CheckoutPage() {
    const initialValues: CheckoutForm = {
        shippingAddress: {
            firstName: '',
            lastName: '',
            streetAddress: '',
            apartment: '',
            postCode: '',
            country: '',
        },
        billingAddress: {
            firstName: '',
            lastName: '',
            streetAddress: '',
            apartment: '',
            postCode: '',
            country: '',
        },
        sameAddress: true,
        phoneNumber: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: CheckoutFormSchema,
        onSubmit: (values) => {
            console.log({ values });
            // alert(JSON.stringify(values, null, 2));
        }
    })

    const history = useHistory()

    return (
        <>
            <Helmet>
                <title>Checkout | Scentbird</title>
            </Helmet>
            <div className={styles.container}>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>

                        <AddressForm name="shippingAddress" title="Shipping address" />
                        <div className={styles.row}>
                            <div className={styles.cell1}> <Input name="phoneNumber" label="Phone number (Optional)" /></div>
                            <div className={styles.cell1}>
                                <div className={styles.offersNotice}>We may send you special discounts and offers</div></div>
                        </div>

                        <Checkbox name="sameAddress" label="Use this address as my billing address" />
                        {!formik.values.sameAddress && <AddressForm name="billingAddress" title="Billing address" />}

                        <div className={styles.footer}>
                            <span onClick={() => history.goBack()} className={styles.backLink}>Back</span>
                            <Button type="submit">
                                <span className={styles.buyNowText}>Buy now</span>
                                <i className={`${styles.buyNowIcon} icon-arrow-right`}></i>
                            </Button>
                        </div>
                    </form>
                </FormikProvider>

            </div >
        </>

    )
}