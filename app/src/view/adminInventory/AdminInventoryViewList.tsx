import { Table } from 'antd';
import React from 'react'
import useInventory from '../../hooks/inventory/useInventory';

export default function AdminInventoryViewList() {

    const { inventory, loading } = useInventory();

    return (
        <>
            <Table
                loading={loading}
            >
                
            </Table>
        </>
    );
}