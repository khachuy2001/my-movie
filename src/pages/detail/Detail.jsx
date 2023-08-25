import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList'

const Detail = () => {
    // Lấy tham số từ URL, trong trường hợp này là 'category' (loại) và 'id' (id phim/series)
    const { category, id } = useParams();

    // State để lưu thông tin phim/series
    const [item, setItem] = useState(null);

    // Sử dụng useEffect để gọi API và lấy thông tin chi tiết khi component mount
    useEffect(() => {
        const getDetail = async () => {
            // Gọi API để lấy thông tin chi tiết dựa trên category (loại) và id
            const response = await tmdbApi.detail(category, id, { params: {} });
            // Lưu thông tin vào state để hiển thị
            setItem(response);
            // Cuộn lên đầu trang khi thông tin được tải
            window.scrollTo(0, 0);
        };
        // Gọi hàm getDetail khi component mount và các dependencies (category, id) thay đổi
        getDetail();
    }, [category, id]);

    return (
        <>
            {item && ( // Nếu có thông tin item (phim/series), thực hiện rendering
                <>
                    {/* Banner (ảnh nền) hiển thị backdrop_path hoặc poster_path */}
                    <div className="banner" style={{
                        backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`
                    }}></div>
                    {/* Phần chi tiết thông tin phim/series */}
                    <div className="mb3 movie-content container">
                        {/* Poster hiển thị poster_path hoặc backdrop_path */}
                        <div className="movie-content__poster">
                            <div className="movie-content__poster__img" style={{
                                backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`
                            }}></div>
                        </div>
                        {/* Thông tin phim/series */}
                        <div className="movie-content__info">
                            {/* Tiêu đề phim/series */}
                            <div className="title">
                                {item.title || item.name}
                            </div>
                            {/* Các thể loại */}
                            <div className="genres">
                                {

                                    //Hàm slice(0, 5) được sử dụng để lấy tối đa 5 thể loại đầu tiên.
                                    item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="genres__item">{genre.name}</span>
                                    ))
                                }
                            </div>
                            {/* Mô tả chi tiết */}
                            <p className="overview">{item.overview}</p>
                            {/* Danh sách diễn viên */}
                            <div className="cast">
                                {/* Tiêu đề danh sách diễn viên */}
                                <div className="section__header">
                                    <h2>Casts</h2>
                                </div>
                                <CastList id={item.id} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3">
                            <VideoList id={item.id} />
                        </div>
                        <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Similar</h2>
                            </div>
                            <MovieList category={category} type='similar' id={item.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Detail;
