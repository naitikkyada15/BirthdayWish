import * as React from 'react';
import styles from './Speech.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import MicRecorder from 'mic-recorder-to-mp3';
import { sp, Web } from "@pnp/sp/presets/all";
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, TextField } from 'office-ui-fabric-react';
import Filename from './Filename';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export interface IRecordState {
    isRecording: any;
    blobURL: any;
    isBlocked: any;
    HideFilename: Boolean;
    Filename: any;
    currentbob: any;
}

export interface IRecordProps {
    spfxContext: any;
    ishidden: any;
    SiteURL: any;
    onDismiss: any;
}

const modelProps = {
    isBlocking: true,
    topOffsetFixed: true,
};

export default class Record extends React.Component<IRecordProps, IRecordState> {

    public constructor(props: IRecordProps) {
        super(props);
        sp.setup({ spfxContext: this.props.spfxContext });
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            HideFilename: true,
            Filename: 'Wishes',
            currentbob: []
        };
        
    }

    public render(): React.ReactElement<IRecordProps> {
        return (
            <>
                <Dialog
                    minWidth={800}
                    hidden={this.props.ishidden}
                    onDismiss={this.props.onDismiss}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Record your Wishes',
                        closeButtonAriaLabel: 'Close',
                    }}
                    modalProps={modelProps}
                >
                    <div>
                        <DefaultButton onClick={() => this.Start()} disabled={this.state.isRecording} text="Record" />

                        <DefaultButton style={{ marginLeft: "15px" }} onClick={() => this.Stop()} disabled={!this.state.isRecording} text="Stop" />

                        <audio style={{ marginLeft: "50px" }} src={this.state.blobURL} controls />
                        <TextField label="Enter File Name" value={this.state.Filename} onChange={(e, val) => { this.setState({ Filename: val }); }} />
                    </div>
                    <DialogFooter>
                        <PrimaryButton className='Button' onClick={() => { this.sendAudioFile(); }} text="Save" />
                        <DefaultButton className='Button' onClick={() => { this.props.onDismiss() }} text="Cancel" />
                    </DialogFooter>
                </Dialog>
                <Filename HideFilename={this.state.HideFilename} spfxContext={this.props.spfxContext} />
            </>
        );
    }

    public componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true });
            },
        );
    }

    public Start = () => {

        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));

        }
    }

    public Stop = () => {

        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {

                this.setState({ currentbob: blob });
                // myFile = new File([blob], '' + this.state.Filename + '.mp3', {
                //     type: blob.type,
                // });
                const blobURL = URL.createObjectURL(blob);
                // this.sendAudioFile(myFile);
                this.setState({ blobURL: blobURL, isRecording: false });
            }).catch((e) => { console.log(e); });

    }

    public sendAudioFile = async () => {
        let myFile = new File([this.state.currentbob], '' + this.state.Filename + '.mp3', {
            type: this.state.currentbob.type,
        });

        await sp.web.lists.getByTitle("Audio").rootFolder.files.add(myFile.name, myFile, true).then((d) => {
            alert("Audio file added in Document Library !!!!");
            this.props.onDismiss();
        }).catch((e) => {
            console.log(e);
        });

    }
}
