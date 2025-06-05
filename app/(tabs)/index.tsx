import { ImageSourcePropType, Text, View, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

/*
useState — влияет на отображение, вызывает перерисовку.
useRef — просто хранит данные между рендерами (например, для статистики, таймеров, ссылок и т.д.).
*/

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';


const PlaceHolderImage = require('@/assets/images/default.jpg');
export default function Index() {
	const imageRef = useRef<View>(null);

	const [status, requestPermission] = MediaLibrary.usePermissions();
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

	if (status === null) {
		requestPermission();
	}
	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			quality: 1,
		})
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert('Didnt choose anything');
		}
	};

	const onReset = () => {
		setShowAppOptions(false);
	}
	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};
	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			//captureRef(...) — takes a reference (object) and returns a URI (path to image)
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				});
				await MediaLibrary.saveToLibraryAsync(localUri);
				if (localUri) {
					alert('Saved!');
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				});
				let link = document.createElement('a');
				link.download = 'sticker-smash.jpeg';
				link.href = dataUrl;
				link.click();
			} catch (e) {
				console.log(e);
			}
		}
	}


	//Возврат JSX:
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage} />
					{pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
				</View>
			</View>
			{showAppOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon="refresh" label="Reset" onPress={onReset} />
						<CircleButton onPress={onAddSticker} />
						<IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
					<Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
				</View>
			)}
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageContainer: {
		flex: 1,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
});

/*
// props — это просто аргументы функции (объект с данными)
// Пример:
function sayHello(name: string) {
  console.log("Hello " + name);
}

// В React:
type Props = {
  isVisible: boolean;
  onClose: () => void;
};

function MyModal(props: Props) {
  // ...
}

// Передаём пропсы так:
<MyModal isVisible={true} onClose={someFunction} />

// Если внутри компонента будут вложенные элементы:
<MyModal isVisible={true} onClose={handler}>
  <Text>Привет</Text>
</MyModal>

// TypeScript покажет ошибку — нужно указать `children`:

// Вариант 1 — вручную:
type Props = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

// Вариант 2 — проще:
type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

// PropsWithChildren<...> добавляет `children` автоматически
// А <{ ... }> — это твои собственные пропсы



<View ref={imageRef} collapsable={false}> - area for saving image

*/