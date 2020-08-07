import React, {Component} from 'react';
import {View, Text, Image, Button, Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// axios.defaults.baseURL = 'http://192.168.0.105:3000/';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

  addImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: response,
        });
      }
    });
  };

  uploadImage = async () => {
    var photo = this.state.image;
    const data = new FormData();

    data.append('file', {
      name: 'photo',
      filename: photo.fileName,
      type: photo.type,
      data: photo.data,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    // fetch('http://10.0.2.2:3000/users/upload', config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // axios
    //   .post('http://10.0.2.2:3000/users/addEmployee', {
    //     name: 'fgfdds',
    //     email: 'fgfdds@gmail.com',
    //     etype: 'General Manager',
    //     salary: 78546954,
    //   })
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log('error ---- ', error));

    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2:3000/users/upload',
      {
        otherHeader: 'file',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: photo.fileName,
          type: photo.type,
          data: RNFetchBlob.wrap(photo.path),
          uri:
            Platform.OS === 'android'
              ? photo.uri
              : photo.uri.replace('file://', ''),
        },
      ],
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err, '-----');
      });

    // axios
    //   .post('users/upload', data, {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    //       'Access-Control-Allow-Headers':
    //         'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err, '-----');
    //   });
  };

  render() {
    return (
      <View>
        <Image
          style={{width: '100%', height: 350, marginTop: 50}}
          resizeMode="contain"
          source={{
            uri:
              this.state.image == ''
                ? 'https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png'
                : this.state.image.uri,
          }}
        />
        <Text> ImageUpload </Text>
        <Button title="Add Image" onPress={this.addImage} />
        <Button title="Upload" onPress={this.uploadImage} />
      </View>
    );
  }
}

export default ImageUpload;
