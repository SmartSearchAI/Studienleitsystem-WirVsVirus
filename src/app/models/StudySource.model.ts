
export enum API_T {
    GET = 1,
    QUERY,
    STUDY_FIELDS_LIST,
    SEARCH_AREAS
}

interface Dictionary<T> {
    [Key: number]: T;
}

export class StudySource {
    Name: string;
    URL: string;
    API: Dictionary<string> = {};
    constructor(Name: string, URL: string) {
        this.Name = Name;
        this.URL = URL;
    }
}

export enum StudySource_T {
    CLINICALTRIALS = 1
}

export abstract class StudySourceFactory {
    public static GetSource(Type: StudySource_T) {
        switch (Type) {
            case StudySource_T.CLINICALTRIALS: {
                return this.GetClinicalTrialsSource();
            }
            default: {
                console.log(`Invalid Type: ${Type}`);
                return null;
            }
        }
    }

    private static GetClinicalTrialsSource() {
        let source: StudySource = new StudySource('ClinicalTrials.gov', 'https://clinicaltrials.gov/api/');
        source.API[API_T.QUERY] = 'query/study_fields?expr={0}&fields={1}&min_rnk={2}&max_rnk={3}&fmt=JSON';
        source.API[API_T.GET] = 'query/ct2/show/{0}?&fmt=JSON';
        source.API[API_T.STUDY_FIELDS_LIST] = 'info/study_fields_list&fmt=JSON';
        source.API[API_T.SEARCH_AREAS] = 'info/search_areas&fmt=JSON';
        return source;
    }
}