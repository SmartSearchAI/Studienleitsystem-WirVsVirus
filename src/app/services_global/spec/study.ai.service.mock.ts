import { Injectable } from '@angular/core';
import {HTTPService} from '../http.service';
import * as mock_projectdata_info from './data/ProjectData.info.response.json';
import * as mock_projectdata from './data/ProjectData.response.json';
import * as mock_studydata from './data/GetStudy.response.json';
import * as mock_matchesdata from './data/GetMatches.response.json';
import * as mock_keywordsdata from './data/GetKeyWordsFromText.response.json';

@Injectable({
  providedIn: 'root'
})
export class StudyAIServiceMock {
  constructor(private http: HTTPService) {
  }

  GetIDIndex(ids: Array<string>) {
    const IDs = mock_projectdata_info.response.body.IDs;
    const result: Array<number> = [];
    ids.forEach((id)  => {
      const idx = mock_projectdata_info.response.body.IDs.indexOf(id);
      result.push(idx);
    });
    return result;
  }

  GetStudy(parameter: {id: Array<string>; fields: Array<string>}) {
    const test_data = { ...mock_studydata.response, body: {...mock_studydata.response.body}};
    test_data.body.data = {...mock_studydata.response.body.data};
    const idx = this.GetIDIndex(parameter.id);
    const data = [];
    idx.forEach((i) => {
      data.push(test_data.body.data[i]);
    });
    test_data.body.data = Array.from(data);
    return this.http.get_mock<any>(test_data);
  }

  GetAvailableData() {
    const test_data = mock_projectdata_info.response;
    return this.http.get_mock<any>(test_data);
  }


  GetKeyWordsFromText(parameter: {text: string, count: number}) {
    // @TODO Mock Request
    const test_data = mock_keywordsdata.response;
    return this.http.get_mock<any>(test_data);
  }


  GetProjections(parameter: {id: Array<string>}) {
    const test_data = mock_projectdata.response;
    return this.http.get_mock<any>(test_data);
  }

  GetMatches(id: Array<string>, id_matches: Array<string> = []) {
    const test_data = { ...mock_matchesdata.response, body: {...mock_matchesdata.response.body}};
    test_data.body.data = {...mock_matchesdata.response.body.data};
    for (let prop in test_data.body.data) {
      test_data.body.data[prop] = id.indexOf(prop) >= 0 ? 1: Math.random();
    }
    return this.http.get_mock<any>(test_data);
  }
}
