import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export interface IReactgridProps {
    description: string;
  }

export interface ITabelProps {
    keyField: any;
    TableDataAndColumns: any;
}
export interface ITabelState {
    // selectedRows: any;
}

export default class Tabel extends React.Component<ITabelProps, {}> {
    public render(): React.ReactElement<ITabelState> {
        return (
            <ToolkitProvider
                keyField={this.props.keyField}
                data={this.props.TableDataAndColumns.rows}
                columns={this.props.TableDataAndColumns.columns}
                search
            >
                {
                    prop => (
                        <div>
                            <BootstrapTable
                                {...prop.baseProps}
                                striped
                                hover
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        );
    }
}
