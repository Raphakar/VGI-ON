import React from 'react';

class ImageFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "someUniqueId", // I would use this.props.id for a real world implementation
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
        this.readURI(e); // maybe call this with webworker or async library?
        if (this.props.onChange !== undefined)
            this.props.onChange(e); // propagate to parent component
    }

    render() {
        const imgTag = this.buildImgTag();

        return <div>
            <input
                id={this.state.id}
                type="file"
                onChange={this.handleChange.bind(this)} />
            {imgTag}
        </div>;
    }
}
export default ImageFile