import SideMenuTagList from './SideMenuTagList/SideMenuTagList';
import TagManagerBtn from './TagManagerBtn/TagManagerBtn';
import UploadNotesBtn from './UploadNotesBtn/UploadNotesBtn';

import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher';

import './style.css';

const SideMenu = () => {
	return (
		<section className='side-menu'>
			<div className='side-menu__header'>
				Изменить тему: <ThemeSwitcher />
			</div>
			<TagManagerBtn />

			<SideMenuTagList />

			<UploadNotesBtn />
		</section>
	);
};

export default SideMenu;
