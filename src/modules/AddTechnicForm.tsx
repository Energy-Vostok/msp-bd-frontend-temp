import styles from './AddTechnicForm.module.scss';
import {
    Formik,
    Form,
    Field,
} from 'formik';

interface MyFormValues {
    name: string,
    category: string,
    city: string,
    price: {
        withTax: number,
        withoutTax: number,
        cash: number
    },
    propertyValues: {
        value: string,
        propertyId: number
    }[],
    images: {
        url: string
    }[],
    company: {
        name: string,
        inn: string,
        contacts: {
            fullName: string,
            phone: string,
            email: string,
            role: string
        }[]
    }
}

const AddTechnicForm = () => {
    const initialValues: MyFormValues = {
        name: '',
        category: '',
        city: '',
        price: {
            withTax: 0,
            withoutTax: 0,
            cash: 0
        },
        propertyValues: [],
        images: [],
        company: {
            name: '',
            inn: '',
            contacts: [],
        }
    };
    return (
        <div>
            <h1>Добавить новую технику</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form className={styles.form}>
                    <label htmlFor="name">Название</label>
                    <Field id="name" name="name" placeholder="Название техники" />

                    <label htmlFor="type">Категория</label>
                    <Field name="category" as="select">
                        <option value="Экскаватор">Экскаватор</option>
                        <option value="Бульдозер">Бульдозер</option>
                    </Field>

                    <label htmlFor="city">Город</label>
                    <Field id="city" name="city" placeholder="Город" />

                    <label htmlFor="withTax">Цена с НДС</label>
                    <Field id="withTax" name="withTax" placeholder="Название техники" />

                    <label htmlFor="withoutTax">Цена без НДС</label>
                    <Field id="withoutTax" name="withoutTax" placeholder="Название техники" />

                    <label htmlFor="cash">Цена за наличные</label>
                    <Field id="cash" name="cash" placeholder="Название техники" />

                    <label htmlFor="name">Название</label>
                    <Field id="name" name="name" placeholder="Название техники" />

                    <button type="submit">Добавить</button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddTechnicForm;