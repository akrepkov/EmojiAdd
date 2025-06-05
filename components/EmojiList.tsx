import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image } from 'expo-image';

type Props = {
	onSelect: (image: ImageSourcePropType) => void;
	onCloseModal: () => void;
}
//FlatList is a React Native component that is a scrolling list 
// that shows changing information while keeping the same look.
export default function EmojiList({ onSelect, onCloseModal }: Props) {
	const [emoji] = useState<ImageSourcePropType[]>([
		require('../assets/images/emoji1.png'),
		require('../assets/images/emoji2.png'),
		require('../assets/images/emoji3.png'),
		require('../assets/images/emoji4.png'),
		require('../assets/images/emoji5.png'),
		require('../assets/images/emoji6.png'),
		require('../assets/images/emoji7.png'),
		require('../assets/images/emoji8.png'),
		require('../assets/images/emoji9.png'),
		require('../assets/images/emoji10.png'),
	]);

	//useState<...>() — говорит: "эта переменная будет массив изображений"

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={Platform.OS === 'web'}
			data={emoji}
			contentContainerStyle={styles.listContainer}
			renderItem={({ item, index }) => (
				<Pressable onPress={() => {
					onSelect(item);
					onCloseModal();
				}}>
					<Image source={item} key={index} style={styles.image} />
				</Pressable>
			)}
		/>
	)
}



const styles = StyleSheet.create({
	listContainer: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	image: {
		width: 100,
		height: 100,
		marginRight: 20,
	},
});


/*
renderItem=
This is a prop that expects a function.

({ item, index }) =>
This is an arrow function that takes one parameter — an object with properties item and index.

The outer {item, index} here is the function parameter destructuring syntax, meaning the argument is an object and you pull out item and index directly from it.

Equivalent to:
(arg) => {
  const item = arg.item;
  const index = arg.index;
  ...
}

( ... ) after arrow - These parentheses are used to immediately return the JSX inside them without writing an explicit return statement.
So this:
		({ item, index }) => (
		<Pressable>...</Pressable>
		)
is short for:
		({ item, index }) => {
		return (
			<Pressable>...</Pressable>
		);
		}

*/