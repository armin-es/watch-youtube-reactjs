import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';

import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyCxB6ZnQsbjfYTcuCB7uMXyNftb08x2_m4';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('Ontario');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}


	render() {
		const videoSearch = _.debounce(term => this.videoSearch(term), 500);
		return (
			<div>
				<SearchBar className="search-bar" onSearchTermChange={videoSearch} />
				<VideoDetails video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));