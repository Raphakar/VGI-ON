import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            data: props.data,
            gridApi: undefined,
            gridColumnApi: undefined,
        }
        this.onGridReady = this.onGridReady.bind(this);
    }

    createColumns() {
        return this.state.columns.map((e, i) => {
            return (
                <AgGridColumn key={i} field={e.value} valueGetter={e.valueGetter} checkboxSelection={!!e.selectable} filter={!!e.filter} sortable={!!e.sortable} />
            );
        })
    }

    onGridReady(params) {
        this.setState({
            gridApi: params.api,
            gridColumnApi: params.columnApi
        });
    };

    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 500, width: '100%', display:'inline-block' }}>
                <AgGridReact rowData={this.state.data}
                    onGridReady={this.onGridReady}
                    defaultColDef={{ resizable: true }}
                    rowSelection={'multiple'}
                    onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    {this.createColumns()}
                </AgGridReact>
            </div>
        );
    }
}

export default Grid;