import { KeyWordsComponent } from '../components/KeyWordsComponent/KeyWords.component';

export interface Dictionary<T> {
    [Key: string]: T;
}
export class Study {
    $Id: string;
    $BriefTitle: string;
    $Fields: Dictionary<string>;
    $Selected: boolean;
    $Rank: number;
    $Q: Array<number>;
    $Analytics: {Keywords: Array<{Key: String, Value: Number}>, Values: any};

    // tslint:disable-next-line: max-line-length
    constructor(Rank, Id: string, BriefTitle: string, Fields: Dictionary<string>, Analytics: {Keywords: any, Values: any}, Selected = false,  Q = []) {
        this.$Id = Id;
        this.$BriefTitle = BriefTitle;
        this.$Fields = Fields;
        this.$Selected = Selected;
        this.$Rank = Rank;
        this.$Q = [];
        this.$Analytics = Analytics;

        const Keywords = Object.getOwnPropertyNames(this.$Analytics.Keywords).map((prop) => {
            return {Key: prop, Value: this.$Analytics.Keywords[prop]};
        });
        this.$Analytics.Keywords = Keywords;
    }
}

export class ClinicalTrialStudy extends Study {
    constructor(item: object) {
        const fields: Dictionary<string> = {};
        let Id: string;
        let Rank = 1;
        let BriefTitle: string;
        let props: Array<string>;
        let analytics : {Keywords: Array<string>, Values: any} = {Keywords: [], Values: []};
        props = Object.getOwnPropertyNames(item);
        props.forEach(prop => {
            const value = item[prop];
            switch (prop) {
                case 'NCTId': {
                    Id = value[0]; break;
                }
                case 'Rank': {
                    Rank = value; break;
                }
                case 'BriefTitle': {
                    BriefTitle = value[0]; break;
                }
                default: {
                    fields[prop] = value[0]; break;
                }
            }
        });
        super(Rank, Id, BriefTitle, fields, analytics);
    }
}