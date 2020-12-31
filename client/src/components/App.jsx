import React from 'react';
import Dropzone from 'react-dropzone';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
const arrayMove = require('array-move');
import content_template from '../../../templates/content-template';

const SortableItem = SortableElement(({value, onLoad}) => <li><img height="60" src={value} onLoad={onLoad}/></li>);
 
const SortableList = SortableContainer(({items, onLoad}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} onLoad={onLoad} />
      ))}
    </ul>
  );
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',
      textareaValueAlts: [],
      textareaValueLinks: [],
      textareaValueImages: [],
      imageInfos: [],
      /**
       * { 
       *   url: '',
       *   filename: '',
       *   width: 0,
       *   height: 0,
       * }
       */
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.target.value });
  }

  onLoad(e) {
    var newImageInfos = this.state.imageInfos.slice();
    var index = newImageInfos.findIndex(item => item.url === e.target.src);
    console.log('in onload', e.target);
    newImageInfos[index].width = e.target.naturalWidth;
    newImageInfos[index].height = e.target.naturalHeight;
    
    this.setState({ 
      imageInfos: newImageInfos
     }, () => console.log('after ', this.state));
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      imageInfos: arrayMove(this.state.imageInfos, oldIndex, newIndex),
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value.split('\n'),
    }, () => console.log('in inputchange ', this.state));
  }

  onDrop(droppedFiles) {
    console.log('onDrop', droppedFiles);
    const newImageInfos = droppedFiles.map((file) => {
      return {
        url: URL.createObjectURL(file),
        filename: file.name,
        width: 60,
        height: 60,
      };
    });
    this.setState({
      imageInfos: newImageInfos,
    }, () => console.log(this.state));
  };

  render() {
    const {
      imageInfos, textareaValueAlts, activeTab, textareaValueLinks, textareaValueImages
    } = this.state;
    if (imageInfos.length > 0) {
      var productsHtml = content_template(imageInfos, textareaValueAlts, textareaValueLinks).replace(/\n\s+\n/g, '\n');
    }
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
                <textarea wrap="off" rows="10" id="alt" name="textareaValueAlts" value={textareaValueAlts.join('\n')} onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="link-input">
              <label htmlFor="links">
                <br />
                Links:
                {' '}
                <br />
                <textarea wrap="off" rows="10" id="links" name="textareaValueLinks" value={textareaValueLinks.join('\n')} onChange={this.handleInputChange} />
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
                  onDrop={this.onDrop}>{({ getRootProps, isDragActive }) => (
                    this.state.imageInfos.length == 0 ? 
                    <textarea
                      {...getRootProps()}
                      style={{ backgroundColor: (isDragActive ? '#ddd' : 'initial') }}
                      wrap="off"
                      rows="10"
                      id="images"
                      name="textareaValueImages"
                      value={textareaValueImages}
                      onChange={this.handleInputChange} /> 
                      :
                      <SortableList items={this.state.imageInfos.map(imageInfo => imageInfo.url)} onSortEnd={this.onSortEnd} onLoad={this.onLoad} />
                  )}</Dropzone>
              </label>
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
            <br />
            {activeTab === 'codeview'
              && <textarea id="codeview" rows="25" cols="100" value={productsHtml} readOnly />}
            {activeTab === 'preview'
              && <div id="preview" dangerouslySetInnerHTML={{ __html: productsHtml }} />}
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
          </div>
        </article>
      </div>
    )
  }
}

export default App;