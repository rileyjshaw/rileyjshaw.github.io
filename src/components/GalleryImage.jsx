import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './GalleryImage.css';

const Thumbnail = React.forwardRef(({children, ...props}, ref) => (
	<button ref={ref} className="gallery-button" {...props}>
		{children}
	</button>
));

const GalleryImage = ({ThumbnailImage, FullImage, aspectRatio}) => (
	<Dialog.Root>
		<Dialog.Trigger asChild>
			<Thumbnail>{ThumbnailImage}</Thumbnail>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="dialog-overlay" />
			<Dialog.Content className="dialog-content" style={{aspectRatio}}>
				{FullImage}
				<Dialog.Close asChild>
					<button className="icon-button" aria-label="Close">
						✖
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default GalleryImage;
