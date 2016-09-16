/**
 * Created by NetCenter-305 on 2016/7/8.
 */
import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {
    headline: {
        fontSize: 30,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    }
};

const TabsExampleSimple = () => (
    <Tabs>
        <Tab id="sorts_single" label="Single Member" />
        <Tab id="sorts_all" label="All Members" />
    </Tabs>
);

export default TabsExampleSimple;