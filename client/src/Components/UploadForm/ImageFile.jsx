import React from 'react';
import Img from "../../images/uploadImage.png";

class ImageFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURI: null
        }
    }

    buildImgTag() {
        let imgTag = null;
        if (this.state.imageURI !== null)
            imgTag = (
                <div>
                    <img style={{ width: '100%' }} src={this.state.imageURI}></img>
                </div>);
        return imgTag;
    }

    readURI(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (ev) {
                this.setState({ imageURI: ev.target.result });
            }.bind(this);
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    handleChange(e) {
        this.readURI(e);
        if (this.props.onChange !== undefined)
            this.props.onChange(e);
    }

    render() {
        const imgTag = this.buildImgTag();

        return <div>
            <label>
                {
                    !this.state.imageURI &&
                    <img src={Img} style={{ width: 200, height: 200 }} />
                }
                <input
                    hidden
                    type="file"
                    onChange={this.handleChange.bind(this)} />
                {imgTag}
            </label>
        </div>;
    }
}

export default ImageFile;