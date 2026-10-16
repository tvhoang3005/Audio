import { createSlice } from '@reduxjs/toolkit';

// Static demo data for the home page track list.
const initialState = {
    tracks: [
        {
            id: '2tA704YZh',
            artists: ['Đạt G', ' DuUyen'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/2/9/0/6/2906681d4b764cd4677342b66813f25d.jpg',
            title: 'Bánh Mì không',
        },
        {
            id: 'D7POB9MSY',
            artists: ['Dương Hoàng Yến', ' Thanh Hưng'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/b/e/9/7be9788129f81d9c3d685969db8ab70a.jpg',
            title: 'Em Một Mình Quen Rồi',
        },
        {
            id: 'qqoRRFpty',
            artists: ['Chi Dân'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/9/9/e/999e7aa9d6d42e60d3b2f28072a0c968.jpg',
            title: 'Sao Chẳng Phải Là Anh',
        },
        {
            id: '_X-OqfFch',
            artists: ['JSOL'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/9/3/f/f/93ff7ed52bb926e05b65499b1838c014.jpg',
            title: 'Hết Yêu Thật Sao (Let Me Love You)',
        },
        {
            id: 'sbb6mttR_',
            artists: ['Noo Phước Thịnh'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/f/7/3/7f73439ab651aef6c8175930f6e16495.jpg',
            title: 'Xin Đừng Buông Tay (Solo Version)',
        },
        {
            id: 'BoRBtQI-Y',
            artists: ['Jack', ' K-ICM'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/b/f/9/8bf90008a57a96e1f376e76a32c26f0c.jpg',
            title: 'Việt Nam Tôi',
        },
        {
            id: 'LztycCTcA',
            artists: ['Quang Đăng Trần', ' Đoàn Minh Vũ'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/e/a/2/6/ea26f468386d5e274adc014a9af97f91.jpg',
            title: 'Phải Làm Gì ?',
        },
        {
            id: 'IoRsKAAA-',
            artists: ['Việt'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/3/2/5/73257d3f2cb6b1c16719bebc443980f9.jpg',
            title: 'Tình Đẹp Đến Mấy Cũng Tàn',
        },
        {
            id: 'qLYfskz6y',
            artists: ['Khổng Tú Quỳnh', ' RIN9'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/5/e/2/65e2aef3a9b86aa3b108b1cebc035015.jpg',
            title: 'Mãi Mãi Là Một Lời Nói Dối (Piano Version)',
        },
        {
            id: 'BdmHp6eco',
            artists: ['Trung Quân Idol'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/b/e/a/c/beac17d2f91c771e7c2ab734666f19f7.jpg',
            title: 'Mình Yêu Nhau Từ Lúc Nào (Pháp Sư Mù OST)',
        },
        {
            id: 'V4dtqrT6VS',
            artists: ['Thu Thủy', ' Ti Kull'],
            thumbnail:
                'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/d/e/0/7de02278ea1741e5b09cec5268fe6bcf.jpg',
            title: 'Yêu Làm Chi (Cover)',
        },
        {
            id: 'QJTpZCUg',
            artists: ['Trịnh Thiên Ân', 'ViruSs'],
            thumbnail:
                'https://zmp3-photo-fbcrawler.zadn.vn/cover_rect/5/1/3/5/513501c8682113290f8fe8739a8e2e8a.jpg',
            title: 'Em Ổn Không',
        },
    ],
};

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {},
});

export const selectTracks = (state) => state.track.tracks;

export default trackSlice.reducer;
