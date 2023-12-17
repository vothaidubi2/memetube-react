import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ReportAPI from '../../utils/ReportAPI';
import { UserContext } from '../Cookie/UserContext';


export default function DialogInformation(props) {
  const userData = React.useContext(UserContext);
  const { onCloseDialogReport, selectedValue, openDialogReport, data, idvideo, idcomment } = props;

  const handleCloseDialogReport = () => {
    onCloseDialogReport(selectedValue);
  };

  const handleListItemClick = async (value) => {
    if (idvideo != null) {
      await ReportAPI.createReport(`/reportvideo?iduser=${userData.Iduser}&idvideo=${idvideo}&content=${value}`);
    }
    if (idcomment != null) {
      await ReportAPI.createReport(`/reportcomment?iduser=${userData.Iduser}&idcomment=${idcomment}&content=${value}`);
    }
    onCloseDialogReport(value);
  };

  if (userData) {

    return (
      <Dialog onClose={handleCloseDialogReport} open={openDialogReport}>
        <DialogTitle>Report Form</DialogTitle>
        <List sx={{ pt: 0 }}>
          {data.map((data) => (
            <ListItem disableGutters key={data}>
              <ListItemButton onClick={() => handleListItemClick(data)}>
                <ListItemText primary={data} />
              </ListItemButton>
            </ListItem>
          ))}

        </List>
      </Dialog>
    );
  }
}

DialogInformation.propTypes = {
  onCloseDialogReport: PropTypes.func.isRequired,
  openDialogReport: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


