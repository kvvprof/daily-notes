import CodeBlock from './CodeBlock/CodeBlock';
import LinkBlock from './LinkBlock/LinkBlock';
import ParagraphBlock from './ParagraphBlock/ParagraphBlock';
import PictureBlock from './PictureBlock/PictureBlock';
import SubtitleBlock from './SubtitleBlock/SubtitleBlock';

import { TBlock } from '../../../types/note';

const Blocks = (block: TBlock) => {
	switch (block.type) {
		case 'subtitle':
			return <SubtitleBlock block={block} />;

		case 'paragraph':
			return <ParagraphBlock block={block} />;

		case 'code':
			return <CodeBlock block={block} />;

		case 'picture':
			return <PictureBlock block={block} />;

		case 'link':
			return <LinkBlock block={block} />;

		default:
			return <h1>Ошибка создания блока</h1>;
	}
};

export default Blocks;
