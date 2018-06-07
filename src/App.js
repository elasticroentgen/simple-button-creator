import React, {Component} from 'react';
import {SketchPicker} from 'react-color';
import FontAwesome from 'react-fontawesome';
import './App.css';
import html2canvas from 'html2canvas'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: '#7ED321',
            logoText: 'Your Text',
            icon:'rocket'
        };
    }

    handleTextChange = (event) => {
        this.setState({
            ...this.state,
            logoText: event.target.value
        });
    };

    handleChangeComplete = (color) => {
        this.setState({
            ...this.state,
            background: color.hex
        });
    };

    download = () => {
        html2canvas(document.getElementById('logo')).then(canvasElement => {
            const MIME_TYPE = "image/png";
            const imgURL = canvasElement.toDataURL(MIME_TYPE);
            const dlLink = document.createElement('a');

            dlLink.download = "logo.png";
            dlLink.href = imgURL;
            dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

            document.body.appendChild(dlLink);
            dlLink.click();
            document.body.removeChild(dlLink);
        });
    };

    changeIcon = (event) => {
      this.setState({
          ...this.state,
          icon: event.target.value
      });
    };

    render() {

        const previewStyle = {
            margin: '0 auto',
            width: '300px',
            height: '75px',
            display: 'flex',
            justifyContent: 'flex-start',
            backgroundColor: this.state.background,
        };

        const iconHolder = {
            height: '75px',
            width: '75px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: '2px 2px 8px #000'
        };

        const controlStyle = {
            margin: '50px',
            display: 'flex',
            justifyContent: 'space-around'
        };

        const controlInner = {
            margin: '10px'
        };

        const textStyle = {
            fontSize: '28px',
            fontWeight:'bold',
            width: '225px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: '2px 2px 8px #000'
        };

        const linkStyle = {
            color:'white'
        };

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Simple Button Creator</h1>
                    <div style={previewStyle} id='logo'>
                        <div style={iconHolder}>
                            <FontAwesome name={this.state.icon} size='3x'/>
                        </div>
                        <div style={textStyle}>
                            <div>
                                {this.state.logoText}
                            </div>
                        </div>
                    </div>
                    <button style={{marginTop: '20px'}} onClick={this.download}>Download as JPG</button>
                </header>
                <div style={controlStyle}>
                    <div style={controlInner}>
                        <h2>Pick a color</h2>
                        <SketchPicker
                            color={this.state.background}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </div>
                    <div style={controlInner}>
                        <h2>Choose an icon</h2>
                        <input type='input' value={this.state.icon} onChange={this.changeIcon} /><br/>
                        <a style={linkStyle} href='https://fontawesome.com/cheatsheet' target='_blank'>Choose from here</a>
                    </div>
                    <div style={controlInner}>
                        <h2>Choose a text</h2>
                        <input type='text' value={this.state.logoText} onChange={this.handleTextChange}/>
                    </div>
                </div>


            </div>
        );
    }
}

export default App;
