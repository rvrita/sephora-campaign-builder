import React from 'react';
import Dropzone from 'react-dropzone';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
const arrayMove = require('array-move');
import content_template from '../../../templates/main-content-template';
import shellUS from '../../../templates/shellUS';
import shellCA from '../../../templates/shellCA';
import gmail from '../../../templates/gmail';

const ROW_HEIGHT = 60;

window.addEventListener('beforeunload', function (e) {
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
  e.preventDefault();
  e.returnValue = '';
});

const SortableItem = SortableElement(({ value, onLoad, onDeleteItem }) => (
  <li className="drag-item">
    <img height="60"
      src={value}
      onLoad={onLoad}
      onContextMenu={(e) => { onDeleteItem(); e.preventDefault(); }} />
  </li>));

const SortableList = SortableContainer(({ items, onLoad, onDeleteItem }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} onLoad={onLoad} onDeleteItem={() => onDeleteItem(index)} />
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
      sections: [], // url, filename, width, height, link, alt
      snippetType: 'content-builder',
      localeType: 'us', // us, caEN, caFR
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangeLocale = this.handleInputChangeLocale.bind(this);
    this.handleInputChangeSnippets = this.handleInputChangeSnippets.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.buildSections = this.buildSections.bind(this);
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.target.value });
  }

  handleReset() {
    if (confirm('Are you sure you want to clear the form?')) {
      this.setState({
        activeTab: '',
        textareaValueAlts: [],
        textareaValueLinks: [],
        textareaValueImages: [],
        imageInfos: [],
        sections: [], // url, filename, width, height, link, alt
        snippetType: '',  
      });
    }
  }

  onLoad(e) {
    var newImageInfos = this.state.imageInfos.slice();
    var index = newImageInfos.findIndex(item => item.url === e.target.src);
    newImageInfos[index].width = e.target.naturalWidth;
    newImageInfos[index].height = e.target.naturalHeight;

    this.setState({
      imageInfos: newImageInfos
    });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      imageInfos: arrayMove(this.state.imageInfos, oldIndex, newIndex),
    });
    this.buildSections();
  }

  onDeleteImage(index) {
    this.setState({
      imageInfos: this.state.imageInfos.filter((_, idx) => idx != index),
    });
  }

  buildSections() {
    var newSections = [];
    var images = this.state.imageInfos;
    var newSection = [];
    var currWidth = 0;

    for (var i = 0; i < images.length; i++) {
      var item = {
        ...images[i],
        alt: this.state.textareaValueAlts[i] || '',
        link: this.state.textareaValueLinks[i] || '<a href="#">',
      };
      if (item.width === 700) {
        // full width new section
        if (currWidth > 0) {
          console.log("Warning: section less than 700px width.", newSection);
          newSections.push(newSection);
          newSection = [];
          currWidth = 0;
        }
        newSections.push([item]);
      } else if (item.width === 320) {
        // botnavs
        if (images[i + 1] && images[i + 1].width === 320) {
          var item2 = {
            ...images[i + 1],
            alt: this.state.textareaValueAlts[i + 1] || '',
            link: this.state.textareaValueLinks[i + 1] || '<a href="#">',
          };
          newSections.push([item, item2]);
          i++;
        } else {
          newSections.push([item, item]);
        }
      } else {
        // vertical section, add image to current
        currWidth += item.width;
        newSection.push(item);
        if (currWidth >= 700) {
          if (currWidth > 700) {
            console.log("Warning: section exceeded 700px width.", newSection);
          }
          newSections.push(newSection);
          newSection = [];
          currWidth = 0;
        }
      }
    }
    this.setState({
      sections: newSections
    }, () => console.log(this.state));
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value.split('\n'),
    }, () => this.buildSections());
  }

  handleInputChangeLocale(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleInputChangeSnippets(event) {
    const { name, value } = event.target;
    if (value !== 'content-builder') {
      this.setState({ activeTab: 'codeview' });
    }
    this.setState({
      [name]: value,
    });
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
      imageInfos: [...this.state.imageInfos, ...newImageInfos],
    });

    // Wait for images to load, it should be fast since they're local files
    setTimeout(this.buildSections, 500);
  };

  render() {
    const {
      sections, textareaValueAlts, activeTab, textareaValueLinks, 
      textareaValueImages, snippetType, localeType
    } = this.state;
    if (snippetType === 'shellUS') {
      var productsHtml = shellUS().replace(/\n\s+\n/g, '\n');
    } else if (snippetType === 'shellCA') {
      var productsHtml = shellCA().replace(/\n\s+\n/g, '\n');
    } else if (snippetType === 'gmail') {
      var productsHtml = gmail().replace(/\n\s+\n/g, '\n');
    } else if (sections.length > 0) {
      var productsHtml = content_template(sections, localeType).replace(/\n\s+\n/g, '\n');
    } else {
      var productsHtml = '';
    }
    return (
      <div>
        <header>
          <div className="topline" />
          <div className="logo">
            <img src="images/logo.svg" alt="Sephora logo" width="200" height="auto" />
            <h1>Email Campaign Builder</h1>
          </div>
          <div className="topline" />
        </header>
        <article className="fixed">
        <h2>Choose the builder or a code snippet</h2>
          <div className="snippet-list">
          <label htmlFor="content-builder">
              <input type="radio" id="content-builder" name="snippetType" value="content-builder" onChange={this.handleInputChangeSnippets} checked={snippetType === 'content-builder'} />
              {' '}
              Content builder
            </label>
            <label htmlFor="shellUS">
              <input type="radio" id="shellUS" name="snippetType" value="shellUS" onChange={this.handleInputChangeSnippets} checked={snippetType === 'shellUS'} />
              {' '}
              US shell snippet
            </label>
            <label htmlFor="shellCA">
              <input type="radio" id="shellCA" name="snippetType" value="shellCA" onChange={this.handleInputChangeSnippets} checked={snippetType === 'shellCA'} />
              {' '}
              CA shell snippet
            </label>
            <label htmlFor="gmail">
              <input type="radio" id="gmail" name="snippetType" value="gmail" onChange={this.handleInputChangeSnippets} checked={snippetType === 'gmail'} />
              {' '}
              Gmail snippet
            </label>
          </div>
          <br/>

          {snippetType === 'content-builder' &&
          <>
          <div className="locale">
            <label htmlFor="locale-us">
              <input type="radio" id="locale-us" name="localeType" value="us" onChange={this.handleInputChangeLocale} checked={localeType === 'us'} />
              {' '}
              US
            </label>
            <label htmlFor="locale-caEN">
              <input type="radio" id="locale-caEN" name="localeType" value="caEN" onChange={this.handleInputChangeLocale} checked={localeType === 'caEN'} />
              {' '}
              CA EN
            </label>
            <label htmlFor="locale-caFR">
              <input type="radio" id="locale-caFR" name="localeType" value="caFR" onChange={this.handleInputChangeLocale} checked={localeType === 'caFR'} />
              {' '}
              CA FR
            </label>
          </div>
          <h2>Add your links and images</h2><form onSubmit={this.handleFormSubmit}>
              <div className="alt-input">
                <label htmlFor="alt">
                  <br />
                  Alt text:
                  {' '}
                  <br />
                  <textarea
                    wrap="off"
                    id="alt"
                    style={{ minHeight: textareaValueAlts.length * ROW_HEIGHT }}
                    name="textareaValueAlts"
                    value={textareaValueAlts.join('\n')}
                    onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="link-input">
                <label htmlFor="links">
                  <br />
                  Links:
                  {' '}
                  <br />
                  <textarea
                    wrap="off"
                    style={{ minHeight: textareaValueLinks.length * ROW_HEIGHT }}
                    id="links"
                    name="textareaValueLinks"
                    value={textareaValueLinks.join('\n')}
                    onChange={this.handleInputChange} />
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
                      <div
                        className="list-area"
                        {...getRootProps()}
                        style={{ backgroundColor: (isDragActive ? '#ddd' : 'initial') }}>
                        <SortableList
                          items={this.state.imageInfos.map(imageInfo => imageInfo.url)}
                          onSortEnd={this.onSortEnd}
                          onDeleteItem={this.onDeleteImage}
                          onLoad={this.onLoad} />
                      </div>
                    )}</Dropzone>
                </label>
              </div>
            </form><br/><br/></>}
          
          <h2>Get your code</h2>
          <br />
          <div id="codewindow">
            {snippetType === 'content-builder' && <><div className="tab">
              <button
                type="button"
                value="codeview"
                onClick={this.handleTabClick}>Generated Code</button>
              <button
                type="button"
                value="preview"
                onClick={this.handleTabClick}>Preview</button>
              {/* <button
                type="button"
                value="reset"
                onClick={this.handleReset}>Reset</button> */}
            </div><br /></>}
            {activeTab === 'codeview'
              && <textarea
                id="codeview"
                rows="25"
                value={productsHtml}
                readOnly
                onClick={(e) => e.target.select()} />
              }
            {activeTab === 'preview'
              && <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: productsHtml }} />}
          </div>
        </article>
      </div>
    )
  }
}

export default App;