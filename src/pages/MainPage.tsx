import NotePopup from '../components/Editor/Editor';
import Header from '../components/Header/Header';
import MainContent from '../components/MainContent/MainContent';
import TagManager from '../components/TagManager/TagManager';

const Main = () => {
	return (
		<>
			<Header />
			<TagManager />
			<NotePopup />
			<MainContent />
		</>
	);
};

export default Main;
