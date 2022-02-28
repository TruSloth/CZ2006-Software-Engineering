import React, {useRef, useState} from 'react';

import {
	FlatList,
	View,
	Text,
	StyleSheet,
	Platform,
	Image,
	ScrollView,
	ImageSourcePropType,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import TappableCard from '../../atoms/TappableCard';
import HorizontalSection from '../../atoms/HorizontalSection';
import TopBanner from '../../molecules/TopBanner';
import CategoryFilter from '../../atoms/CategoryFilter';

const HomeScreenContent = () => {
		const [previouslyVisitedData, setPreviouslyVisitedData] = useState([
		{
			title: 'Location 1',
			subtitle: '5 Stars',
			subtextLine1: '10 in Queue',
			subtextLine2: '~ 5 mins',
		},
		{
			title: 'Location 2',
			subtitle: '4 Stars',
			subtextLine1: '5 in Queue',
			subtextLine2: '~ 5 mins',
		},
		{
			title: 'Location 3',
			subtitle: '3 Stars',
			subtextLine1: '3 in Queue',
			subtextLine2: '~ 5 mins',
		},
	]);

	const [nearbyRestaurantsData, setNearbyRestaurantsData] = useState([
		{
			title: 'Location 1',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
		{
			title: 'Location 2',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
		{
			title: 'Location 3',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
		{
			title: 'Location 4',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
	]);

	const [search, setSearch] = useState('');

	const [bannerHeight, setBannerHeight] = useState(0);

	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	return (
		<View style={{flex: 1}}>
			<ScrollView style={styles.homeScreenContent}>
				<TopBanner
					title={'Hi, John!'}
					subtitle={'Where are you going to queue next?'}
					avatarImage={reactNativeLogo}
					style={styles.homeBanner}
					onLayout={(e) => {
						e.persist();
						setBannerHeight(e && e.nativeEvent ? e.nativeEvent.layout.height : 0)
					}}
				></TopBanner>
				<SearchBar
					onChangeText={text => setSearch(text)}
					value={search}
					platform={Platform.OS === 'ios' ? 'ios' : 'android'}
					onClear={(text) => setSearch('')}
					round={false}
					placeholder={'Search'}
					placeholderTextColor={'#7879F1'}
					containerStyle={[styles.searchBar, {top: bannerHeight + 25}]}
					inputContainerStyle={styles.searchBarInput}

				></SearchBar>
				<HorizontalSection
					child={
						<View style={styles.categoryRow}>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
						</View>
					}
				></HorizontalSection>
				<HorizontalSection
					child={
						<FlatList
							horizontal
							data={previouslyVisitedData}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardTitle={item.title}
										cardSubtitle={item.subtitle}
										cardSubtextLine1={item.subtextLine1}
										cardSubtextLine2={item.subtextLine2}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={'Previously Visited'}
				></HorizontalSection>
				<HorizontalSection
					child={
						<FlatList
							horizontal
							data={nearbyRestaurantsData}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardTitle={item.title}
										cardSubtitle={item.subtitle}
										cardSubtextLine1={item.subtextLine1}
										cardSubtextLine2={item.subtextLine2}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={'Nearby Restaurants'}
				></HorizontalSection>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	homeScreenContent: {},

	categoryRow: {
		flexDirection: 'row',
		justifyContent: "space-evenly",
		paddingVertical: 20
	},

	searchBar: {
		marginHorizontal: 20,
		borderRadius: 10,
		position: 'absolute',
		width: '90%',
		elevation: 5,
		zIndex: 1,
		height: 50,
		justifyContent: 'center'
	},

	searchBarInput: {

	},

	homeBanner: {
		marginVertical: 20
	},
});

export default HomeScreenContent;
