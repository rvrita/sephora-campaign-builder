import React from 'react';
import Dropzone from 'react-dropzone';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',
      textareaValueAlt: '',
      textareaValueLinks: '',
      textareaValueImages: '',
      imageUrls: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    // const { textareaValue } = this.state;

    document.location = '#step2';
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({
      [name]: value,
    }, () => console.log(this.state));
  }

  onDrop(droppedFiles) {
    console.log('onDrop', droppedFiles);
    const newImageUrls = droppedFiles.map((file) => {
      return URL.createObjectURL(file);
    });
    this.setState({
      imageUrls: newImageUrls,
    });
  };

  render() {
    const {
      textareaValueAlt, activeTab, textareaValueLinks, textareaValueImages
    } = this.state;
    return (
      <div>
        <header>
          <div className="topline" />
          <div className="logo">
            <img src="/images/logo.svg" alt="Sephora logo" width="200" height="auto" />
            <h1>Email Campaign Builder</h1>
          </div>
          <div className="topline" />
        </header>
        <article className="fixed">
          <h2>1. Add your links and images</h2>
          <form onSubmit={this.handleFormSubmit}>
            <div className="alt-input">
              <label htmlFor="alt">
                <br />
                Alt text:
                {' '}
                <br />
                <textarea wrap="off" rows="10" id="alt" name="textareaValueAlt" value={textareaValueAlt} onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="link-input">
              <label htmlFor="links">
                <br />
                Links:
                {' '}
                <br />
                <textarea wrap="off" rows="10" id="links" name="textareaValueLinks" value={textareaValueLinks} onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="image-input">
              <label htmlFor="images">
                <br />
                Images:
                {' '}
                <br />
                <Dropzone
                  disableClick
                  style={{}}
                  onDrop={this.onDrop}>{({getRootProps, isDragActive}) => (
                    <textarea
                      {...getRootProps()}
                      style={{ backgroundColor: (isDragActive ? '#ddd' : 'initial') }}
                      wrap="off"
                      rows="10"
                      id="images"
                      name="textareaValueImages"
                      value={textareaValueImages}
                      onChange={this.handleInputChange} />
                  )}</Dropzone>
              </label>
              {this.state.imageUrls.map(imageUrl => (
                <img src={imageUrl} height="60" />
              ))}
            </div>
          </form>
          <br />
          <br />
          <h2>2. Get your code</h2>
          <br />
          <div id="codewindow">
            <div className="tab">
              <button type="button" value="codeview" onClick={this.handleTabClick}>Generated Code</button>
              <button type="button" value="preview" onClick={this.handleTabClick}>Preview</button>
            </div>
            {/* <br />
            {activeTab === 'codeview'
              && <textarea id="codeview" rows="25" cols="100" value={productsHtml} readOnly />}
            {activeTab === 'preview'
              && <div id="preview" dangerouslySetInnerHTML={{ __html: productsHtml }} />} */}
          </div>

          <div id="examples">
            <h3>Example links</h3>
            <textarea
              id="example-links"
              name="example-links"
              rows="10"
              defaultValue={`<a href="[@trackurl LinkID='' LinkName='dennisgrossdailypeel' LinkTag='pl-p4' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P269122?skuId=1499482&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='carolinaherreraparfum' LinkTag='pl-p5' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P420533?skuId=1960707&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='ctminilipsticklipliner' LinkTag='pl-p6' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458268?skuId=2339620&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='pmgdivinerosepalette' LinkTag='pl-p7' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458276?skuId=2351542&$deep_link=true[/@trackurl]" target="_blank">`}
            />
            <br /><br />
            <h3>Example images</h3>
            <textarea
              id="example-images"
              name="example-images"
              rows="10"
              defaultValue={`http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/8725_v2-FS-SEPHORA_DIGI_ANI_DEDICATED_EMAIL-2_09.jpg
http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/8725_v2-FS-SEPHORA_DIGI_ANI_DEDICATED_EMAIL-2_10.jpg
http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/8725_v2-FS-SEPHORA_DIGI_ANI_DEDICATED_EMAIL-2_11.jpg
http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/8725_v2-FS-SEPHORA_DIGI_ANI_DEDICATED_EMAIL-2_12.jpg`}
            />
          </div>
        </article>
      </div>
    )
  }
}

export default App;