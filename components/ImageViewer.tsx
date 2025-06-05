import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

//if i use require directly, i dont need ImageSourcePropType, but if 
//const MyImage = ({ picture }) => (
//   <Image source={picture} />
//React Native doesnt understand if picture is url or object and we add :
// type Props = {
//   imgSource: ImageSourcePropType;
// };


type Props = {
	imgSource: ImageSourcePropType;
	selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
	const imageSource = selectedImage ? {uri: selectedImage} : imgSource;
	return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	}
})