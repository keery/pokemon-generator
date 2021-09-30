"use strict";

const {
  h
} = require('preact');

module.exports = ({
  currentDeviceId,
  videoSources,
  onChangeVideoSource
}) => {
  return h("div", {
    className: "uppy-Webcam-videoSource"
  }, h("select", {
    className: "uppy-u-reset uppy-Webcam-videoSource-select",
    onChange: event => {
      onChangeVideoSource(event.target.value);
    }
  }, videoSources.map(videoSource => h("option", {
    key: videoSource.deviceId,
    value: videoSource.deviceId,
    selected: videoSource.deviceId === currentDeviceId
  }, videoSource.label))));
};