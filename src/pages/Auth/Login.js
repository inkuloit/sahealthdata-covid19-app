import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Session } from 'bc-react-session';
import { useAuth } from 'context/auth';
import useForm from 'react-hook-form';
import {
    AuthProvider,
    GeoLocationProvider,
} from 'providers';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [invalidForm, setInvalidForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setAuthTokens } = useAuth();

    document.title = 'Portal Login';

    useEffect(() => {
        const clearSession = async () => {
            await Session.destroy();
        };
        clearSession();
    }, []);

    const onSubmit = data => {
        handleLogin(data);
    };

    async function handleLogin(data) {
        setIsSubmitting(true);
        const geoLocation = await GeoLocationProvider.getClientLocation();
        const auth = await AuthProvider.login(data.username, data.password, geoLocation);
        if (auth.success) {
            // start react session
            await Session.start({
                payload: auth.data,
                expiration: 21600000, // 6 hours
            });
            setAuthTokens(auth.data);
            alert('Successfully logged in!');
            window.location = '/cpanel/dashboard';
        } else {
            setIsSubmitting(false);
            alert(auth.message);
        }
    }

    return (
        <div className="content content-fixed content-auth">
            <Container className="pd-x-0 pd-lg-x-10 pd-xl-x-0">
                <div className="media align-items-stretch justify-content-center ht-100p pos-relative">
                    <form method="post" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="sign-wrapper mg-lg-l-50 mg-xl-l-60">
                            <div className="wd-100p">
                                <h3 className="tx-color-01 mg-b-5">Sign In</h3>
                                <p className="tx-color-03 tx-16 mg-b-40">Welcome back! Please signin to continue.</p>

                                <div className={`form-group ${errors.username && 'is-invalid'}`}>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        disabled={isSubmitting}
                                        onKeyUp={(e) => {
                                            setInvalidForm(e.target.value.length <= 4);
                                        }}
                                        ref={register({ required: true })}
                                    />
                                    <small className="help-block invalid-feedback">{errors.username && 'Invalid username'}</small>
                                </div>
                                <div className={`form-group ${errors.password && 'is-invalid'}`}>
                                    <div className="d-flex justify-content-between mg-b-5">
                                        <label htmlFor="password" className="mg-b-0-f">Password</label>
                                        {/* <a href="" className="tx-13">Forgot password?</a> */}
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        autoComplete="new-password"
                                        disabled={isSubmitting}
                                        onKeyUp={(e) => {
                                            setInvalidForm(e.target.value.length < 3);
                                        }}
                                        ref={register({ required: true })}
                                    />
                                    <small className="help-block invalid-feedback">{errors.password && 'Invalid password'}</small>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-brand-02 btn-block"
                                    disabled={isSubmitting || invalidForm}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Login;
