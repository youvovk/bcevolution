# leads lp framework


## Lead fields to handle:
first_name, last_name, email, phone_number, phone_country_prefix

### Installing

pull repository from git

enter to repository directory and run: npm run build, you will have read permissions only, do not try to push to this repository

put the repository next to your react project repository and reference it, for example:


```
import LpFramework, {LpFrameworkWrapper} from './../../../../lp-framework/dist/index';
```

Change render function of to like this:

```
ReactDOM.render(
    <LpFramework
        resourceFile={require('./resources/languages.json')}
        funnel_name={"test"}>
        <LpFrameworkWrapper Component={App}/>
    </LpFramework>,
    document.getElementById('root')
);
```


### Props to LpFrameworkWrapper

Component - pass your app component you want to render

the children of LpFrameworkWrapper will have this props:

* countryCode - country code by location
* phone_country_prefix - phone country prefix of the page by location
* language - language of the page by location or by query param (see query params below)
* onSubmit - callback for last step when submiting the lead, will send the lead, redirect to broker lp if succeded.
* validateParams - callback for validating the lead inputs, return: { success: [true / false], errors: ["error1", "error2"] }
* handleLeadStep - callback for each lead step

all callbacks recieve as parameter object that his keys can be each of the lead fields.


for example:

```
this.props.onSubmit({
	first_name: "test",
	email: "test"
});
```

### Props to LpFrameworkWrapper

resourceFile - json file contains all fields that changing dynamically according to language.

funnel_name - name of funnel


### Usage example

```
<LpFramework
	resourceFile={require('./resources/languages.json')}
	funnel_name={"test"}>
	<LpFrameworkWrapper Component={App}/>
</LpFramework>



export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            page: 'main'
        };

    }

    pageHandler= (page) => {
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

    };

    handleStep = (step) => {
        this.setState({step})
    };

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params);
    };

    render() {
	    if (this.state.page === 'main') {
		return (
		    <div className='App'>
		        <TopSection handlePassSync={this.handlePassSync}
		                    countryCode={this.props.countryCode}
		                    handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
		                    pageHandler={this.pageHandler}
		                    handleForward={this.handleForward}
		                    languageManager={this.props.languageManager}
		                    validateParams={this.props.validateParams}/>
		        <MidSection
		            languageManager={this.props.languageManager}
		            validateParams={this.props.validateParams}
		        />
		        <BottomSection
		                    languageManager={this.props.languageManager}
		                    handlePassSync={this.handlePassSync}
		                    countryCode={this.props.countryCode}
		                    handleStep={this.handleStep}
		                    step={this.state.step}
		                    handleSubmit={this.handleSubmit}
		                    pageHandler={this.pageHandler}
		                    handleForward={this.handleForward}
		                    validateParams={this.props.validateParams}/>
		    </div>
		)
	    } else {
		return (
		    <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
		)
	    }
    }
}


```

