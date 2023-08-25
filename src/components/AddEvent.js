import React, { useState } from "react";
import {
  Button,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import dayjs from "dayjs";

export default function AddEvent() {
  const [event, setEvent] = useState({
    date: dayjs(),
    startingTime: "",
    endingTime: "",
    title: "",
    description: "",
  });
  const [eventList, setEventList] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEvent({
      date: dayjs(),
      startingTime: "",
      endingTime: "",
      title: "",
      description: "",
    });
  };

  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpandedEvent(isExpanded ? index : null);
  };

  const handleDateChange = (date) => {
    setEvent({ ...event, date: date });
  };

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    if (dayjs(event.startingTime).isAfter(dayjs(event.endingTime))) {
      alert("Starting time must be before ending time");
      return;
    }

    const newEvent = { ...event };
    setEventList([...eventList, newEvent]);
    setEvent({
      date: dayjs(),
      startingTime: "",
      endingTime: "",
      title: "",
      description: "",
    });
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marking: 10, color: "white", backgroundColor: "black", display: "flex" }}
        onClick={handleClickOpen}
      >
        Add Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">



            <div className="formInput">
              <DatePicker
                label="Date"
                minDate={dayjs()}
                onChange={handleDateChange}
                value={event.date}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <br />
            <div className="formInput">
              <TimePicker
                label="Starting time"
                onChange={(time) => setEvent({ ...event, startingTime: time })}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="formInput">
              <TimePicker
                label="Ending time"
                onChange={(time) => setEvent({ ...event, endingTime: time })}
                renderInput={(params) => <TextField {...params} />}
                />
            </div>

          </LocalizationProvider>
          <TextField
            autoFocus
            name="title"
            value={event.title}
            onChange={handleInputChange}
            label="Title"
            fullWidth
            margin="dense"
          />
          <TextField
            autoFocus
            name="description"
            value={event.description}
            onChange={handleInputChange}
            label="Description"
            fullWidth
            margin="dense"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={addEvent} color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <h2>Events</h2>
        {eventList.map((event, index) => {
          const durationStartingTime = event.startingTime;
          const durationEndTime = event.endingTime;
          const duration =
            dayjs(durationEndTime).diff(durationStartingTime, "hour") +
            " hours " +
            (dayjs(durationEndTime).diff(durationStartingTime, "minute") % 60) +
            " minutes";

          return (
            <Accordion
              key={index}
              expanded={expandedEvent === index}
              onChange={handleAccordionChange(index)}
            >
              <AccordionSummary>
                <h3>{event.title}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <p>Description: {event.description}</p>
                  <p>Date: {event.date.format("YYYY-MM-DD")}</p>
                  <p>Starting Time: {event.startingTime.format("HH:mm")}</p>
                  <p>Ending Time: {event.endingTime.format("HH:mm")}</p>
                  <p>Duration: {duration}</p>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
