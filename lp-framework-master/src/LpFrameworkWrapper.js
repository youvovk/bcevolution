export const LpFrameworkWrapper = ({
                              onSubmitLead,
                              funnel_name,
                              languageManager,
                              handleLeadStep,
                              validateParams,
                              language,
                              phone_country_prefix,
                              countryCode
                            }) => (
  <App
    onSubmit={onSubmitLead}
    languageManager={languageManager}
    validateParams={validateParams}
    handleLeadStep={handleLeadStep}
    language={language}
    phone_country_prefix={phone_country_prefix}
    countryCode={countryCode}
  >
  </App>
);
