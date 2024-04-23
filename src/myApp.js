import React, { useState, useCallback } from "react";
import { DefaultLight } from "survey-core/themes/default-light.js";
import { BorderlessLightPanelless } from "survey-core/themes/borderless-light-panelless..js";
import { BorderlessLight } from "survey-core/themes/borderless-light.js";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/i18n/thai";
let survey;
window.loadResponse = (json) => {
  const obj = JSON.parse(json);
  const { response = {} } = obj;
  console.log(response);
  survey.data = response;
};

window.saveIncompleteSurvey = () => {
  const data = survey.data;
  FileMaker.PerformScriptWithOption(
    "Callback_Retrieve Incomplete Survey",
    JSON.stringify(data),
    5
  );
};
const MyApp = ({ obj }) => {
  const {
    showTimer = "none",
    showProgressBar = "off",
    surveyJSON = {},
    response = {},
    mode = "edit",
    callback,
    panels = 1,
    locale = "en",
  } = obj;
  window.displayMode = (mode) => {
    console.log(survey.data);
    setDisplayMode(mode);
  };
  survey = new Model(surveyJSON);
  survey.data = {
    FirstName: "Jeremy",
  };
  survey.focusFirstQuestionAutomatic = true;

  const handleSave = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    FileMaker.PerformScript(callback, results);
  }, []);
  survey.data = response;
  survey.onComplete.add(handleSave);
  survey.applyTheme(DefaultLight);
  survey.showProgressBar = showProgressBar;
  survey.showTimerPanel = showTimer;
  survey.mode = mode;
  survey.locale = locale;
  return <Survey model={survey} />;
};

export default MyApp;
