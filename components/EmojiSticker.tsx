import { ImageSourcePropType, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
	imageSize: number,
	stickerSource: ImageSourcePropType,
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
	const scaleImage = useSharedValue(imageSize); //useSharedValue — значение, которое можно анимировать.
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onStart(() => {
			if (scaleImage.value !== imageSize * 2) {
				scaleImage.value = scaleImage.value * 2;
			} else {
				scaleImage.value = Math.round(scaleImage.value / 2);
			}
		});
		const imageStyle = useAnimatedStyle(() => {
			return {
				width: withSpring(scaleImage.value), //withSpring(...) делает плавную анимацию пружины при смене размеров.
				height: withSpring(scaleImage.value),
			};
		})
	const drag = Gesture.Pan().onChange(event => {
		translateX.value += event.changeX;
		translateY.value += event.changeY;
	})
	const containerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
				{
					translateY: translateY.value,
				}
			]
		}
	})

	return (
		<GestureDetector gesture={drag}>
		<Animated.View style={[containerStyle, { top: -350 }]}>
			<GestureDetector gesture={doubleTap}>
				<Animated.Image
					source={stickerSource}
					resizeMode="contain" //makes sure image doesnt stretch
					style={[imageStyle, { width: imageSize, height: imageSize }]}/>
			</GestureDetector>
		</Animated.View>
		</GestureDetector>
	);
}


/*imageStyle — это базовые стили (например, рамка, цвет фона).
{ width: imageSize, height: imageSize } — динамические стили, которые, например, зависят от состояния или пропсов.
Массив [style1, style2] — это способ объединить стили, где второй объект может переопределить свойства из первого.

*/