import React from 'react';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { Route } from 'react-router-dom';
import { ParcelListPageContainer } from '../../../Parcel/pages/List/parcel.list.page';
import { ParcelFormPageContainer } from '../../../Parcel/pages/Form/parcel.form.page';
import { TractorListPageContainer } from '../../../Tractor/pages/List/tractor.list.page';
import { TractorFormPageContainer } from '../../../Tractor/pages/Form/tractor.form.page';
import { ProcessedParcelFormPageContainer } from '../../../ProcessedParcel/pages/Form/processed-parcel.form.page';
import { ProcessedParcelListPageContainer } from '../../../ProcessedParcel/pages/List/processed-parcel.list.page';
import { ProcessedParcelReportPageContainer } from '../../../ProcessedParcel/pages/Report/processed-parcel.report.page';
import { withRoot } from '../../../../shared/components/RootTheme/root-theme';
import { MfbView } from '../../../../shared/components/Mfb/mfb.view';
import Hidden from '@material-ui/core/Hidden';
import { NavigatorView } from '../Navigator/admin.navigator.view';
import { HeaderView } from '../Header/admin.header.view';
import { useMobileOpen } from '../../hooks/use-mobile-open.hook';

const Admin = props => {
  const [mobileOpen, setMobileOpen] = useMobileOpen(false);

  const { classes, location } = props;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <NavigatorView
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
            classes={{
              paper: classes.drawerPaper,
            }}
            location={location}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <NavigatorView
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            location={location}
          />
        </Hidden>
      </nav>
      <div className={classes.appContent}>
        <HeaderView
          onDrawerToggle={() => setMobileOpen(!mobileOpen)}
          logoutAction={props.logoutAction}
        />
        <main className={classes.mainContent}>
          <Route
            path="/admin/parcel/list"
            component={ParcelListPageContainer}
          />
          <Route path="/admin/parcel/add" component={ParcelFormPageContainer} />

          <Route
            path="/admin/tractor/list"
            component={TractorListPageContainer}
          />
          <Route
            path="/admin/tractor/add"
            component={TractorFormPageContainer}
          />

          <Route
            path="/admin/processed-parcel/list"
            component={ProcessedParcelListPageContainer}
          />
          <Route
            path="/admin/processed-parcel/add"
            component={ProcessedParcelFormPageContainer}
          />
          <Route
            path="/admin/processed-parcel/report"
            component={ProcessedParcelReportPageContainer}
          />
        </main>
        <div className={classes.footer}>
          <MfbView />
        </div>
      </div>
    </div>
  );
};

const AdminStyles = withStyles(styles)(Admin);
export const AdminView = withRoot(AdminStyles);
