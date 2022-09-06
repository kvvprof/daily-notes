import ListOfNotes from './ListOfNotes/ListOfNotes';
import SideMenu from './SideMenu/SideMenu';

import './style.css';

const MainContent = () => {
	return (
		<section className='main-content'>
			<SideMenu />
			<ListOfNotes />
		</section>
	);
};

export default MainContent;
