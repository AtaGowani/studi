const request = require('request');

class Emotion {
  constructor(url) {
    if (url === null || url === undefined) {
      return null;
    }

    this.subscriptionKey = 'c36a1c5d625f4324bdd70db35cc1e50c';
    this.uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
    this.params = {
    'returnFaceAttributes': 'emotion'
    };
    this.imageUrl = url;
  };

  /**
   * @returns {array} string
   */
  static getProminentEmotions() {
    request.post(options, (error, response, body) => {
      if (error) {
        console.log('Error: ', error);
        return null;
      }
      let emotions = JSON.parse(body)[0].emotion;
      
      var highest = -1;
      var dup = false;
      Object.keys(emotions).forEach((key) => {
        if (highest === emotions[key])
          dup = true;
        emotions[key]
      })
    });
  }

}