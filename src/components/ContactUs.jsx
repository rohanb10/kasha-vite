import { useEffect, useRef, useState } from "react";
import "../styles/contact_us.css";
import { getCMSContent } from "../common/cms";

function InputField({type="text", label, required, value, update, keyName, placeholder, error}) {
    return <div className={`input-field ${keyName} ${required ? 'required' : ''}`}>
        <label>{label}</label>
        <input className={error?.length ? 'invalid' : ''} type={type} value={value} placeholder={placeholder} onChange={e => update(e, keyName)} />
        <div className="error">{error}</div>
    </div>
}
function SelectField({options = [], label, required, value, update, keyName, error}) {
    return <div className={`select-field ${keyName} ${required ? 'required' : ''}`}>
        <label>{label}</label>
        <select className={error?.length ? 'invalid' : ''} onChange={e => update(e, keyName)} value={value}>
            {options.map((o,i) => (
                <option key={i} disabled={o.disabled} value={o.disabled ? '' : o.type}>{o.type}</option>
            ))}
        </select>
        <div className="error">{error}</div>
    </div>
}

function TextAreaField({label, placeholder, update, value, keyName, error, required}) {
    return <div className={`textarea-field ${keyName} ${required ? 'required' : ''}`}>
        <label>{label}</label>
        <textarea className={error?.length ? 'invalid' : ''} value={value} placeholder={placeholder} onChange={e => update(e, keyName)} />
        <div className="error">{error}</div>
    </div>
}

export function ContactUs({open, close = () => {}}) {
    const ref = useRef();
    const FIELDS = {
        name: '',
        phone: '',
        email: '',
        type: '',
        details: '',
    }
    const [values, setValues] = useState(FIELDS);
    const [errors, setErrors] = useState(FIELDS);
    const [CONTENT, setContent] = useState();
    const [projectTypes, setProjectTypes] = useState([]);
    const [submit, setSubmit] = useState('draft');

    useEffect(() => {
        if (!CONTENT?.form?.length) return;
        const defaultType = {
            type: 'Select an option',
            disabled: true,
        }
        setProjectTypes([defaultType, ...CONTENT?.form]);
    }, [CONTENT])

    useEffect(() => {
        setValues({...FIELDS, ...{phone: '+91 '}});
        setErrors(FIELDS);
        setSubmit('draft');
        if (!open) return ref?.current?.close();
        ref?.current?.showModal();

        const fetch = async () => {
			const response = await getCMSContent({name: 'content', cached: true});
			if (response) setContent(response);
		}
		if (!CONTENT?.form) fetch();
    }, [open]);

    function updateForm(event, key) {
        setValues(old => ({...old, ...{[key]: event?.target?.value}}));
        setErrors(old => ({...old, ...{[key]: ''}}));
    }

    function formatValues(obj) {
        let newObj = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (value.length && typeof value === 'string') value = value.trim();
            value = value.replace(/[^a-zA-Z0-9\s.,!?:;@\-+=_#%&*()'"|]/g, '');
            newObj[key] = value.substring(0, key === 'details' ? 200 : 50);
        })
        return newObj;
    }

    function validateForm() {
        let isValid = true;
        let errors = FIELDS;
        if (!values?.name?.length) {
            isValid = false;
            errors.name = 'Please enter a name';
        }
        
        const phone_regex = /^\+?(?:\s?[0-9]+)*$/;
        if (!values?.phone?.length || values.phone.length < 10 || values.phone.length > 15 || !phone_regex.test(values?.phone)) {
            isValid = false;
            errors.phone = 'Please enter a valid phone number';
        }

        if (values?.email?.length) {
            const email_regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!email_regex.test(values?.email)) {
                isValid = false;
                errors.email = 'Please enter a valid email address';
            }
        }
        if (!values?.type?.length || values?.type === '') {
            isValid = false;
            errors.type = 'Please select one of the options';
        }
        
        if (!isValid) setErrors(errors);
        return isValid
    }
    function submitForm() {
        if (!validateForm()) return;
        setSubmit('sending');
        fetch("https://submit-form.com/uNSt3jioO", {
            method: 'POST',
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formatValues(values))
        })
        // .then(response => response.json())
        .then(response => {
            setSubmit(response?.status === 200 ? 'success' : 'error')
        })
        .catch(e => setSubmit('error'));
        setTimeout(_ => {
            setSubmit(['error', 'success'][Math.floor(Math.random() * 2)]);
        }, 1000)
    }

    return <dialog className="contact-us" ref={ref} onCancel={close}>
        <div className="contact-form">
            <h2>Contact Us</h2>
            <InputField label="Name" value={values?.name} update={updateForm} keyName="name" error={errors?.name} required/>
            <div className="input-group">
                <InputField label="Phone Number (WhatsApp)" value={values?.phone} update={updateForm} keyName="phone" error={errors?.phone} type="tel" required/>
                <InputField label="Email" value={values?.email} update={updateForm} keyName="email" error={errors?.email} type="email"/>
            </div>
            <SelectField label="Type of Project" options={projectTypes} value={values?.type} update={updateForm} keyName="type" error={errors.type} required/>
            {values?.type?.length > 0 && (
                <TextAreaField label="Details" placeholder={projectTypes.find(pt => pt.type === values?.type)?.placeholder} value={values?.details} update={updateForm} keyName="details" />
            )}
            <div className="error combined-error">
                {submit === 'error' ? 'Unable to submit form' : ''}
            </div>
            <div className="contact-form-actions">
                <button className="contact-form-action cancel" onClick={close}>
                    <span>Cancel</span>
                </button>
                <button className="contact-form-action submit" onClick={_ => ['draft', 'error'].includes(submit) && submitForm()}>
                    {['draft', 'error'].includes(submit) && <span>Send</span>}
                    {submit === 'sending' && <span>Sending...</span>}
                    {submit === 'success' && <span>Sent</span>}
                </button>
            </div>
            <div className={`contact-form-overlay ${submit === 'success' ? 'show' : ''}`}>
                <div className="contact-form-actions">
                    <button className="contact-form-action" onClick={close}>
                        <span>Close</span>
                    </button>
                </div>
                <div className="form-success-msg">
                    <div>
                        <p>Thank you for inquiry.</p>
                        <p>We will reach out to you soon.</p>
                    </div>
                </div>
            </div>
        </div>
        
    </dialog>
}