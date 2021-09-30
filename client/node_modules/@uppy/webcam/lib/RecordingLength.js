"use strict";

const {
  h
} = require('preact');

const formatSeconds = require('./formatSeconds');

module.exports = function RecordingLength({
  recordingLengthSeconds,
  i18n
}) {
  const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
  return h("span", {
    "aria-label": i18n('recordingLength', {
      recording_length: formattedRecordingLengthSeconds
    })
  }, formattedRecordingLengthSeconds);
};