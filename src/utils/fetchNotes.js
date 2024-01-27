import axios from "axios";
import getNumberOfCardsToShow from "./getNumberOfCardsToShow";

const fetchNotes = async (currentPage) => {
  try {
    const noOfCardsPerPage = getNumberOfCardsToShow(window.innerWidth);
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${noOfCardsPerPage}/${currentPage}`);
    return { data: response.data.data, nextValueNull: response.data.nextValueNull, previousValueNull: response.data.previousValueNull };
  } catch (error) {
    if (error.message === 'Network Error') {
      // toast.error("Unable to fetch notes, Server Issue. Please try after some time!!!");
      return { message: "Unable to fetch notes, Server Issue. Please try after some time!!!" };
    }
    else {
      // toast.error(error.message);
      return { message: error.message };
    }
  }
};

export default fetchNotes;