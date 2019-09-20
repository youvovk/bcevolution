import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQueryParams from 'react-query-params';
import * as LeadHandler from './leadHandler';
import * as validateInput from './validateInput';


export default class LpFramework extends ReactQueryParams {
  static propTypes = {
    children: PropTypes.element.isRequired,
    funnel_name: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      languages: null,
      languageJson: null,
      countryCode: "en",
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
        funnel_name: props.funnel_name,
        validation: this.queryParams.validation ? parseInt(this.queryParams.validation.toString()) : 1,
        pixel: this.queryParams.pxl ? this.queryParams.pxl : ""

      }
    };
  }

  sBidTrackingLoaded = () => {
    this.setState({
      leadData: {...this.state.leadData, click_id: window.sbidTracking ? window.sbidTracking.getSession() : ""}
    }, () => {
    });
  };

  componentDidMount(){

    if (window.location.host.indexOf("localhost") > -1) {
      this.setQueryParams({
        validation: 3
      });
    }

    const script = document.createElement("script");

    script.src = "https://d2tjvvl6yqo45i.cloudfront.net/analytics/" + this.state.leadData.account_id + "/script.js";
    script.async = true;

    document.body.appendChild(script);


    window.sbidTracking = window.sbidTracking||{q:[],track:function(data){this.q.push(data)},getSession:function(){return '-1'}};
    //track regular pageview
    sbidTracking.track();

    window.sbidTracking.settings = {
      params:{
        lead_status: "0"
      }
    };


    this.setState({languages: this.props.resourceFile})

    this.sBidTrackingLoaded();

    if (document.getElementById("sb_trk")) {
      document.getElementById("sb_trk").addEventListener("tracking_loaded", this.sBidTrackingLoaded);
    }

    const file = require("./countries.csv");



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
          this.updateStateByLanguage(res.lang, res.countryCode, phonePrefix);
          return res.countryCode;
        });
      }
    });

  }

  updateStateByLanguage = (lang, countryCode, phonePrefix) => {
    let defaultLangJson = this.state.languages['en'];

    switch (lang) {
      default:
        this.updateState(countryCode, defaultLangJson, phonePrefix, 'en');
        break;
      case 'DK':
        let langJsonDa = this.state.languages['da'] ? this.state.languages['da']: defaultLangJson;

        this.updateState(countryCode, langJsonDa, phonePrefix, 'da');
        break;
      case 'NO':
        let langJsonNo = this.state.languages['no'] ? this.state.languages['no']: defaultLangJson;

        this.updateState(countryCode, langJsonNo, phonePrefix, 'no');
        break;
      case 'EN':
        let langJsonEn = this.state.languages['en'] ? this.state.languages['en']: defaultLangJson;

        this.updateState(countryCode, langJsonEn, phonePrefix, 'en');
        break;
      case 'NL':
        let langJsonNl = this.state.languages['nl'] ? this.state.languages['nl']: defaultLangJson;

        this.updateState(countryCode, langJsonNl, phonePrefix, 'nl');
        break;
      case 'AU':
        let langJsonAu = this.state.languages['en'] ? this.state.languages['en']: defaultLangJson;

        this.updateState(countryCode, langJsonAu, phonePrefix, 'en');
        break;
      case 'SG':
        let langJsonSg = this.state.languages['en'] ? this.state.languages['en']: defaultLangJson;

        this.updateState(countryCode, langJsonSg, phonePrefix, 'en');
        break;
      case 'FI':
        let langJsonFi = this.state.languages['fi'] ? this.state.languages['fi']: defaultLangJson;

        this.updateState(countryCode, langJsonFi, phonePrefix, 'fi');
        break;
      case 'SV':
        let langJsonSv = this.state.languages['sv'] ? this.state.languages['sv']: defaultLangJson;

        this.updateState(countryCode, langJsonSv, phonePrefix, 'sv');
        break;
      case 'DE':
        let langJsonDe = this.state.languages['de'] ? this.state.languages['de']: defaultLangJson;

        this.updateState(countryCode, langJsonDe, phonePrefix, 'de');
        break;
      case 'PL':
        let langJsonPl= this.state.languages['pl'] ? this.state.languages['pl']: defaultLangJson;

        this.updateState(countryCode, langJsonPl, phonePrefix, 'pl');
        break;
      case 'ES':
        let langJsonEs = this.state.languages['es'] ? this.state.languages['es']: defaultLangJson;

        this.updateState(countryCode, langJsonEs, phonePrefix, 'es');
        break;
    }
  };

  updateState(countryCode, languageJson, phonePrefix, lang) {
    this.setState({
      languageJson: languageJson,
      countryCode: countryCode,
      leadData: {...this.state.leadData,
        phone_country_prefix: (phonePrefix.indexOf("+") > 0 ? "+" : "") + (phonePrefix ? phonePrefix.toString() : ""),
        language: lang
      }
    });
  }



  handleLeadStep = (data) => {

    if (window.sbidTracking) {
      window.sbidTracking.settings.params.email = this.state.email;
      window.sbidTracking.settings.params.fname = this.state.fname;
      window.sbidTracking.settings.params.lname = this.state.lname;
      window.sbidTracking.track({e: 'lead_next1'});
    }
    LeadHandler.sendLead('/lead_first_step', this.state.leadData).then(res => {
      if (window.sbidTracking) {
        window.sbidTracking.settings.params.lead_id_first_step = res.leadid;
        window.sbidTracking.track({e: 'lead_next1'});
      }

      this.setState({
        leadData:{
        ...this.state.leadData,
        ...data
        }
      }, () => {
      })
    });
  };

  validateParams = (params) => {

    let errors = [];
    Object.keys(params).forEach(p => {

      if (p === "email") {
        if (params[p].length === 0) {
          errors.push("Email is empty");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params[p])) {
          errors.push("Invalid email format")
        }
      }
      else if (p === "last_name") {
        if (params[p].length === 0) {
          errors.push("Last name is empty");
        }
        if (!/^([^0-9]*)$/.test(params[p])) {
          errors.push("Please enter last name without digits")
        }
      }
      else if (p === "first_name") {
        if (params[p].length === 0) {
          errors.push("First name is empty");
        }
        if (!/^([^0-9]*)$/.test(params[p])) {
          errors.push("Please enter first name without digits")
        }
      }
      else if (p === "password") {
        if (params[p].length === 0) {
          errors.push("Password is empty");
        }
        // Check if between 8 and 12 letters
        if (!validateInput.checkPasswordLength(params[p])) {
          errors.push("The password must be 8 characters long")
        }

        // Check if contains special characters
        if (!validateInput.checkSpecial(params[p])) {
          errors.push("Must not contain special characters")
        }

        // Check if has at least 1 lowercase letter
        if (!validateInput.checkLetter(params[p])) {
          errors.push("Must contain at least 1 small letter")
        }

        // Check if has at least 1 capital
        if (!validateInput.checkCap(params[p])) {
          errors.push("Must contain at least 1 capital letter")
        }

        // Check if contains a number
        if (!validateInput.checkNumber(params[p])) {
          errors.push("Must contain at least 1 number")
        }

      }
      else if (p === "agree_2") {
        if (!params[p]) {
          errors.push("Please accept conditions if you want to proceed")
        }
      }
    });

    return {
      success: errors.length === 0,
      errors: errors
    }
  };

  handleSubmit = (data) => {
    if(window.sbidTracking){
      window.sbidTracking.settings.params.phone_number = data.phone_number;
    }

    let phoneNumber = {
      phone_number: data.phone_number
    };
    if(!data.phone_country_prefix){
      phoneNumber = {
        phone_number: this.state.leadData.phone_country_prefix + data.phone_number
      }
    }

    this.setState({
      leadData:{
        ...this.state.leadData,
        ...data,
        ...phoneNumber

      }

    }, () => {

      console.log(this.state.leadData);
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
        }


      });
    });



  };

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


  handleChange = (value) => {
    this.setState({ [value]: value})
  };

  render() {
    let currentLanguageJson = this.state.languageJson;

    let languageManager = function(item)  {
      if(item){
        return currentLanguageJson[item]
      }
      else{
        return currentLanguageJson
      }
    };

    // console.log(this.state.languageJson);
    // console.log(this.state.languages);

    const childrenWithProps = React.Children.map(this.props.children, child =>

      React.cloneElement(child,
        {
          languageManager: languageManager,
          onSubmitLead: this.handleSubmit,
          handleLeadStep: this.handleLeadStep,
          validateParams: this.validateParams,
          language: this.state.leadData.language,
          phone_country_prefix: this.state.leadData.phone_country_prefix,
          countryCode: this.state.countryCode
        })
    );

    if(languageManager()){
      return (
        <div>{childrenWithProps}</div>
      )
    }
    else{
      return null;
    }

  }
}


export const LpFrameworkWrapper = ({
                                     onSubmitLead,
                                     funnel_name,
                                     languageManager,
                                     handleLeadStep,
                                     validateParams,
                                     language,
                                     phone_country_prefix,
                                     countryCode,
                                      Component
                                   }) => (
  <Component
    onSubmit={onSubmitLead}
    languageManager={languageManager}
    validateParams={validateParams}
    handleLeadStep={handleLeadStep}
    language={language}
    phone_country_prefix={phone_country_prefix}
    countryCode={countryCode}
  >
  </Component>
);
