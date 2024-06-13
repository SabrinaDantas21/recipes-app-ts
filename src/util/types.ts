import { NavigateFunction } from 'react-router-dom';

export type SetCredentialsPayloadType = {
  email: string;
  password: string;
};

export type SearchBarInfoType = {
  radioBtnValue: string
  searchBarValue: string
};

export type APIRequestInfo = {
  searchBarInfo: SearchBarInfoType
  navigate: NavigateFunction
};

export type SelectedPage = {
  page?: 'meals' | 'drinks'
};
