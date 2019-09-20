import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'

import * as LeadHandler from './helpers/leadHandler'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
import Page from './pages/Page'

// Versions
import * as Version from './versions'

// Pages
import * as Pages from './pages'

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);

        if (window.location.host.indexOf("localhost") > -1) {
            this.setQueryParams({
                validation: 3
            });
        }

        this.state = {
            step: 1,
            version: null,
            page: 'main',
            leadData: {
                account_id: this.queryParams.acc ? parseInt(this.queryParams.acc) : 89,
                click_id: window.sbidTracking ? window.sbidTracking.getSession() : "",
                phone_country_prefix: "",
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                campaign: this.queryParams.camp ? parseInt(this.queryParams.camp) : 1,
                dp1: this.queryParams.dp1 ? this.queryParams.dp1 : "",
                dp2: this.queryParams.dp2 ? this.queryParams.dp2 : "",
                dp3: this.queryParams.dp3 ? this.queryParams.dp3 : "",
                dp4: this.queryParams.dp4 ? this.queryParams.dp4 : "",
                dp5: this.queryParams.dp5 ? this.queryParams.dp5 : "",
                password: "",
                publisher_click_id: this.queryParams.pub_cid ? this.queryParams.pub_cid : "",
                page_url: window.location.toString(),
                ref_url: "",
                language: navigator.language.split('-')[0],
                funnel_name: "bitcoinevolution",
                validation: this.queryParams.validation ? parseInt(this.queryParams.validation.toString()) : 1
            }
        };

        this.handleStep = this.handleStep.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.handleForward = this.handleForward.bind(this);
        this.handlePassSync = this.handlePassSync.bind(this);
    }

    // handleCountryCodeChange = (countryCode) => {

    //     LeadHandler.postData('/phone_prefix').then(p => {
    //         this.setState({leadData: {...this.state.leadData, phone_country_prefix: "+" + p.toString()}});

    //     })
    // };

    handlePassSync(value) {
        this.setState({
            leadData: {
                ...this.state.leadData,
                password: value
            }
        });
    }

    pageHandler(page) {
        window.scrollTo(0, 0);

        switch (page) {
            default:  
                this.setState({page: 'main'});
                break;
            case 'terms':
                this.setState({page: Pages.terms});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'disc':
                this.setState({page: Pages.disc});
                break;
            case 'spam':
                this.setState({page: Pages.spam});
                break;
        }

    }

    updateState(countryCode, version, phonePrefix, lang) {
        this.setState({
            version: version,
            countryCode: countryCode,
            leadData: {...this.state.leadData,
                phone_country_prefix: (phonePrefix.indexOf("+") > 0 ? "+" : "") + (phonePrefix ? phonePrefix.toString() : ""),
                language: lang
            }
        });
    }

    readTextFile = (file, callback) => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    let allText = rawFile.responseText;

                    const countriesJSON = LeadHandler.csvJSON(allText);
                    this.setState({
                        countriesData: countriesJSON
                    }, () => {
                        callback();

                    });
                }
            }
        };
        rawFile.send(null);
    };

    sBidTrackingLoaded = () => {
        this.setState({
            leadData: {...this.state.leadData, click_id: window.sbidTracking ? window.sbidTracking.getSession() : ""}
        }, () => {
        });
    };

    updateStateByLanguage = (lang, countryCode, phonePrefix) => {
        switch (lang) {
            default:
                this.updateState(countryCode, Version.en, phonePrefix, 'en');
                break;
            case 'DK':
                this.updateState(countryCode, Version.dk, phonePrefix, 'da');
                break;
        }
    };

    componentDidMount() {
        this.sBidTrackingLoaded();

        if (document.getElementById("sb_trk")) {
            document.getElementById("sb_trk").addEventListener("tracking_loaded", this.sBidTrackingLoaded);
        }

        const file = require("./helpers/countries.csv");

        this.readTextFile(file, () => {
            if (this.queryParams.lan) {
                let country = this.state.countriesData.filter(c => {
                    return c["ISO 3166-1 2 Letter Code"] === this.queryParams.lan.toUpperCase()
                })[0];

                if (country) {
                    let lang = country["ISO 3166-1 2 Letter Code"];
                    let countryCode = country["ISO 3166-1 2 Letter Code"];
                    let phonePrefix = country["ITU-T Telephone Code"];

                    this.updateStateByLanguage(lang, countryCode, phonePrefix);
                }
                else {
                    this.updateStateByLanguage('DK', 'DK', '45');
                }
            }
            else {
                LeadHandler.postData('/language').then(res => {
                    let phonePrefix = '+' + this.state.countriesData.filter(c => {
                        return c["ISO 3166-1 2 Letter Code"] === res.countryCode
                    })[0]['ITU-T Telephone Code'];
                    // this.setQueryParams({lan: res.lang});
                    this.updateStateByLanguage(res.lang, res.countryCode, phonePrefix);
                    return res.countryCode;
                });
            }
        });

    }

    handleStep(step) {
        this.setState({step})
    }

    handleForward = (fname, lname, email) => {
        this.setState({
            leadData: {
                ...this.state.leadData,
                email: email,
                first_name: fname,
                last_name: lname
            }
        }, () => {
            LeadHandler.sendLead('/lead_first_step', this.state.leadData).then(res => {
                if (window.sbidTracking) {
                    window.sbidTracking.settings.params.lead_id_first_step = res.leadid;
                    window.sbidTracking.track({e: 'lead_next1'});
                }
            });
        });
    };

    handleSubmit = (fname, lname, email, phoneNumber, password, phone_country_prefix) => {
        let beforeVersion = this.state.version;
        this.setState({
            leadData: {
                ...this.state.leadData,
                email: email.trim(),
                first_name: fname.trim(),
                last_name: lname.trim(),
                phone_number: phoneNumber,
                password: password === "" ? "1234Edddf" : password
            },
            //   version: undefined
        }, () => {

            if(window.sbidTracking){
                window.sbidTracking.settings.params.phone_number = this.state.leadData.phone_number;
            }

            LeadHandler.sendLead('/leads', this.state.leadData).then(res => {


                if (window.sbidTracking) {
                    window.sbidTracking.track({e: 'lead_submit'});
                }

                if (res.success !== undefined) {
                    if (res.success === false) {

                        if (window.sbidTracking) {
                            window.sbidTracking.settings.params.lead_id = res.leadid;
                            window.sbidTracking.settings.params.lead_status = "0";
                        }

                        alert("Due to recent regulatory restriction in your country " +
                            "we are unable to connect you " +
                            "to a suitable brokerage firm. We will contact once the situation will be changed.");
                        this.setState({step: 1});

                        // alert(response.redirectUrl);

                    }
                    else {
                        if(this.queryParams.pxl){
                            let iFrame = document.createElement('iframe');
                            iFrame.setAttribute("src", decodeURIComponent(this.queryParams.pxl));
                            iFrame.style.height = "1px";
                            iFrame.style.width = "1px";
                            document.body.appendChild(iFrame);
                        }

                        if (window.sbidTracking) {
                            window.sbidTracking.settings.params.lead_id = res.leadid;

                            window.sbidTracking.settings.params.lead_status = "1";
                        }
                        window.location.replace(res.redirectUrl);
                    }
                }
                else {
                    if (window.sbidTracking) {
                        window.sbidTracking.settings.params.lead_status = "0";
                    }
                    alert("Due to recent regulatory restriction in your country " +
                        "we are unable to connect you " +
                        "to a suitable brokerage firm. We will contact once the situation will be changed.");
                    this.setState({step: 1});
                }


            });
        });
    };

    render() {
        let page = this.state.page;

        if (this.state.version) {
            if (this.state.page === 'main') {
                return (
                    <div className='App'>
                        <TopSection form={this.state.leadData} handlePassSync={this.handlePassSync}
                                    version={this.state.version} countryCode={this.state.countryCode}
                                    handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                    pageHandler={this.pageHandler}
                                    handleForward={this.handleForward}/>
                        <MidSection version={this.state.version}/>
                        <BottomSection 
                                    form={this.state.leadData} handlePassSync={this.handlePassSync}
                                    version={this.state.version} countryCode={this.state.countryCode}
                                    handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                    pageHandler={this.pageHandler}
                                    handleForward={this.handleForward}/>
                    </div>
                )
            } else {
                return (
                    <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
                )
            }
        } else {
            return null;
        }
    }
}
