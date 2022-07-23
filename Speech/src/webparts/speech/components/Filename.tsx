import * as React from 'react';
import styles from './Speech.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import MicRecorder from 'mic-recorder-to-mp3';
import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
import Record from './Record';
import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from 'office-ui-fabric-react';

export interface IFilenameState {

}
export interface IFilenameProps {
    spfxContext: any;
    HideFilename: any;
}

const modelProps = {
    isBlocking: true,
    topOffsetFixed: true,
};

export default class Filename extends React.Component<IFilenameProps, IFilenameState> {

    public constructor(props: IFilenameProps) {
        super(props);
        sp.setup({ spfxContext: this.props.spfxContext });
        this.state = {

        };
    }


    public render(): React.ReactElement<IFilenameProps> {
        return (
            <Dialog
                minWidth={800}
                hidden={this.props.HideFilename}
                // onDismiss={this.props.onDismiss}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Enter File Name',
                    closeButtonAriaLabel: 'Close',
                }}
                modalProps={modelProps}
            >
                <DialogFooter>
                    <PrimaryButton className='Button' onClick={() => { }} text="Submit" />
                    <DefaultButton className='Button' onClick={() => { }} text="Cancel" />
                </DialogFooter>
            </Dialog>
        );
    }


}
