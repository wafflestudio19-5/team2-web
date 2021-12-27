(this['webpackJsonpteam2-web'] = this['webpackJsonpteam2-web'] || []).push([
  [0],
  [
    ,
    ,
    ,
    function (e, t, r) {
      e.exports = {
        wrapper: 'Tweet_wrapper__1BYn1',
        leftWrapper: 'Tweet_leftWrapper__1rDZi',
        profileImage: 'Tweet_profileImage__taCBf',
        rightWrapper: 'Tweet_rightWrapper__fpJA1',
        topWrapper: 'Tweet_topWrapper__TNwWq',
        topTextWrapper: 'Tweet_topTextWrapper__3Mn0t',
        nameText: 'Tweet_nameText__3rgFE',
        idTimeText: 'Tweet_idTimeText__1C5U5',
        moreButton: 'Tweet_moreButton__3mazr',
        moreButtonImg: 'Tweet_moreButtonImg__24a6K',
        middleWrapper: 'Tweet_middleWrapper__3CZEB',
        mainText: 'Tweet_mainText__p9a4f',
        mainImg: 'Tweet_mainImg__2yJPd',
        bottomWrapper: 'Tweet_bottomWrapper__1P5x0',
        buttonWrapper: 'Tweet_buttonWrapper__x4Dt3',
        commentButton: 'Tweet_commentButton__nyiEe',
        commentImg: 'Tweet_commentImg__VY1LT',
        commentButtonText: 'Tweet_commentButtonText__kyFmM',
        likeButton: 'Tweet_likeButton__1Ve_s',
        likeImg: 'Tweet_likeImg__3cKFT',
        likeButtonText: 'Tweet_likeButtonText__3QEaN',
        retweetButton: 'Tweet_retweetButton__1wljL',
        retweetImg: 'Tweet_retweetImg__1eCxy',
        retweetButtonText: 'Tweet_retweetButtonText__Lu70I',
        shareButton: 'Tweet_shareButton__2Xur5',
        shareImg: 'Tweet_shareImg__ppth6',
      };
    },
    ,
    ,
    ,
    function (e, t, r) {
      e.exports = {
        UserProfileHeader: 'UserProfile_UserProfileHeader__QRc3l',
        UserProfileHeaderButton: 'UserProfile_UserProfileHeaderButton__28g60',
        UserProfileHeaderName: 'UserProfile_UserProfileHeaderName__2odbm',
        UserProfileHeaderTweetsCount:
          'UserProfile_UserProfileHeaderTweetsCount__3J_AO',
      };
    },
    function (e, t, r) {
      e.exports = { ProfilePage: 'ProfilePage_ProfilePage__1TiRY' };
    },
    ,
    ,
    ,
    ,
    function (e, t, r) {
      e.exports = { App: 'App_App__15LM-' };
    },
    function (e, t, r) {
      e.exports = { MainPage: 'MainPage_MainPage__3ArfK' };
    },
    function (e, t, r) {
      e.exports = { LeftBlock: 'LeftBlock_LeftBlock__1lGAX' };
    },
    function (e, t, r) {
      e.exports = { MainBlock: 'MainBlock_MainBlock__2bQvD' };
    },
    function (e, t, r) {
      e.exports = { RightBlock: 'RightBlock_RightBlock__SrVGg' };
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, r) {},
    ,
    function (e, t, r) {
      'use strict';
      r.r(t);
      var n = r(1),
        c = r.n(n),
        a = r(12),
        i = r.n(a),
        l = (r(23), r(13)),
        o = r.n(l),
        s = r(14),
        j = r.n(s),
        d = r(15),
        u = r.n(d),
        p = r(0);
      var b = function () {
          return Object(p.jsx)('div', {
            className: u.a.LeftBlock,
            children: 'leftblock',
          });
        },
        m = r(16),
        f = r.n(m),
        O = r(17),
        h = r.n(O);
      var x = function () {
          return Object(p.jsx)('div', {
            className: h.a.RightBlock,
            children: 'rightblock',
          });
        },
        w = r(6),
        v = r(5),
        g = r(7),
        _ = r.n(g);
      var T = function (e) {
          return Object(p.jsxs)(p.Fragment, {
            children: [
              Object(p.jsxs)('header', {
                className: _.a.UserProfileHeader,
                children: [
                  Object(p.jsx)('button', {
                    className: _.a.UserProfileHeaderButton,
                    children: 'back',
                  }),
                  Object(p.jsxs)('div', {
                    children: [
                      Object(p.jsx)('div', {
                        className: _.a.UserProfileHeaderName,
                        children: 'id.name',
                      }),
                      Object(p.jsx)('div', {
                        className: _.a.UserProfileHeaderTweetsCount,
                        children: '($id.tweet.count)Tweets',
                      }),
                    ],
                  }),
                ],
              }),
              Object(p.jsxs)('body', {
                className: _.a.UserProfileBody,
                children: [
                  Object(p.jsx)('div', {}),
                  Object(p.jsxs)('div', {
                    children: [
                      Object(p.jsxs)('div', {
                        children: [
                          Object(p.jsx)('img', {}),
                          ' ',
                          Object(p.jsx)('button', { children: 'Edit profile' }),
                        ],
                      }),
                      Object(p.jsxs)('div', {
                        children: [
                          Object(p.jsx)('p', { children: 'id.name' }),
                          Object(p.jsx)('p', { children: '@id' }),
                          Object(p.jsx)('p', { children: 'text' }),
                          Object(p.jsx)('p', { children: 'join date' }),
                          Object(p.jsx)('p', {
                            children:
                              '($id.following.count)following ($id.follower.count)follower',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              Object(p.jsx)('button', {
                onClick: function () {
                  e.setIsChosen('Tweets');
                },
                children: 'to Tweets',
              }),
              Object(p.jsx)('button', {
                onClick: function () {
                  e.setIsChosen('TweetsAndReplies');
                },
                children: 'switchToTweetsAndReplies',
              }),
              Object(p.jsx)('button', {
                onClick: function () {
                  e.setIsChosen('Media');
                },
                children: 'switchToMedia',
              }),
              Object(p.jsx)('button', {
                onClick: function () {
                  e.setIsChosen('Likes');
                },
                children: 'switchToLikes',
              }),
            ],
          });
        },
        y = r(18),
        k = r(3),
        P = r.n(k);
      function B() {
        return (B =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function C(e, t) {
        if (null == e) return {};
        var r,
          n,
          c = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              c = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]), t.indexOf(r) >= 0 || (c[r] = e[r]);
            return c;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (c[r] = e[r]));
        }
        return c;
      }
      var I = n.createElement('path', {
        d: 'M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z',
      });
      function N(e, t) {
        var r = e.title,
          c = e.titleId,
          a = C(e, ['title', 'titleId']);
        return n.createElement(
          'svg',
          B(
            {
              width: '24px',
              height: '24px',
              viewBox: '0 0 24 24',
              xmlns: 'http://www.w3.org/2000/svg',
              ref: t,
              'aria-labelledby': c,
            },
            a,
          ),
          r ? n.createElement('title', { id: c }, r) : null,
          I,
        );
      }
      var E = n.forwardRef(N);
      r.p;
      function L() {
        return (L =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function W(e, t) {
        if (null == e) return {};
        var r,
          n,
          c = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              c = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]), t.indexOf(r) >= 0 || (c[r] = e[r]);
            return c;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (c[r] = e[r]));
        }
        return c;
      }
      var R = n.createElement('path', {
        d: 'm7.24264069 2.24264069c.5-2.5 4.34314571-2.65685425 6.00000001-1 1.6034073 1.60340734 1.4999617 4.3343931 0 6l-6.00000001 6.00000001-6-6.00000001c-1.65685425-1.65685425-1.65685425-4.34314575 0-6 1.54996042-1.54996043 5.5-1.5 6 1z',
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        transform: 'translate(3.257 4.257)',
      });
      function M(e, t) {
        var r = e.title,
          c = e.titleId,
          a = W(e, ['title', 'titleId']);
        return n.createElement(
          'svg',
          L(
            {
              width: '21px',
              height: '21px',
              viewBox: '0 0 21 21',
              xmlns: 'http://www.w3.org/2000/svg',
              ref: t,
              'aria-labelledby': c,
            },
            a,
          ),
          r ? n.createElement('title', { id: c }, r) : null,
          R,
        );
      }
      var U = n.forwardRef(M);
      r.p;
      function S() {
        return (S =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function A(e, t) {
        if (null == e) return {};
        var r,
          n,
          c = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              c = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]), t.indexOf(r) >= 0 || (c[r] = e[r]);
            return c;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (c[r] = e[r]));
        }
        return c;
      }
      var H = n.createElement(
        'g',
        {
          fill: 'none',
          fillRule: 'evenodd',
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          transform: 'translate(1 4)',
        },
        n.createElement('path', { d: 'm12.5 9.5 3 3 3-3' }),
        n.createElement('path', { d: 'm8.5.5h3c2.209139 0 4 1.790861 4 4v8' }),
        n.createElement('path', { d: 'm6.5 3.5-3-3-3 3' }),
        n.createElement('path', {
          d: 'm10.5 12.5h-3c-2.209139 0-4-1.790861-4-4v-8',
        }),
      );
      function F(e, t) {
        var r = e.title,
          c = e.titleId,
          a = A(e, ['title', 'titleId']);
        return n.createElement(
          'svg',
          S(
            {
              width: '21px',
              height: '21px',
              viewBox: '0 0 21 21',
              xmlns: 'http://www.w3.org/2000/svg',
              ref: t,
              'aria-labelledby': c,
            },
            a,
          ),
          r ? n.createElement('title', { id: c }, r) : null,
          H,
        );
      }
      var J = n.forwardRef(F);
      r.p;
      function D() {
        return (D =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Z(e, t) {
        if (null == e) return {};
        var r,
          n,
          c = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              c = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]), t.indexOf(r) >= 0 || (c[r] = e[r]);
            return c;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (c[r] = e[r]));
        }
        return c;
      }
      var G = n.createElement(
        'g',
        {
          fill: 'none',
          fillRule: 'evenodd',
          stroke: 'currentColor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          transform: 'translate(3 3)',
        },
        n.createElement('path', { d: 'm11.5 8.5-3.978 4-4.022-4' }),
        n.createElement('path', { d: 'm7.522.521v11.979' }),
        n.createElement('path', {
          d: 'm.5 9v4.5c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4.5',
        }),
      );
      function K(e, t) {
        var r = e.title,
          c = e.titleId,
          a = Z(e, ['title', 'titleId']);
        return n.createElement(
          'svg',
          D(
            {
              width: '21px',
              height: '21px',
              viewBox: '0 0 21 21',
              xmlns: 'http://www.w3.org/2000/svg',
              ref: t,
              'aria-labelledby': c,
            },
            a,
          ),
          r ? n.createElement('title', { id: c }, r) : null,
          G,
        );
      }
      var Q = n.forwardRef(K);
      r.p;
      function V() {
        return (V =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Y(e, t) {
        if (null == e) return {};
        var r,
          n,
          c = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              c = {},
              a = Object.keys(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]), t.indexOf(r) >= 0 || (c[r] = e[r]);
            return c;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (c[r] = e[r]));
        }
        return c;
      }
      var $ = n.createElement(
        'g',
        { fill: 'currentColor', fillRule: 'evenodd' },
        n.createElement('circle', { cx: 10.5, cy: 10.5, r: 1 }),
        n.createElement('circle', { cx: 5.5, cy: 10.5, r: 1 }),
        n.createElement('circle', { cx: 15.5, cy: 10.5, r: 1 }),
      );
      function z(e, t) {
        var r = e.title,
          c = e.titleId,
          a = Y(e, ['title', 'titleId']);
        return n.createElement(
          'svg',
          V(
            {
              width: '21px',
              height: '21px',
              viewBox: '0 0 21 21',
              xmlns: 'http://www.w3.org/2000/svg',
              ref: t,
              'aria-labelledby': c,
            },
            a,
          ),
          r ? n.createElement('title', { id: c }, r) : null,
          $,
        );
      }
      var X = n.forwardRef(z),
        q =
          (r.p,
          function (e) {
            Object(y.a)(e);
            return Object(p.jsxs)('li', {
              className: P.a.wrapper,
              children: [
                Object(p.jsx)('div', {
                  className: P.a.leftWrapper,
                  children: Object(p.jsx)('img', {
                    className: P.a.profileImage,
                    src: 'https://img.sbs.co.kr/newsnet/etv/upload/2014/12/11/30000443115_700.jpg',
                    alt: 'tweet Profile Image',
                  }),
                }),
                Object(p.jsxs)('div', {
                  className: P.a.rightWrapper,
                  children: [
                    Object(p.jsxs)('div', {
                      className: P.a.topWrapper,
                      children: [
                        Object(p.jsxs)('div', {
                          className: P.a.topTextWrapper,
                          children: [
                            Object(p.jsx)('div', {
                              className: P.a.nameText,
                              children: '\uac10\uc790\ud280\uae40',
                            }),
                            Object(p.jsxs)('div', {
                              className: P.a.idTimeText,
                              children: ['@', 'FrenchFries', ' \xb7 ', '10h'],
                            }),
                          ],
                        }),
                        Object(p.jsx)('button', {
                          className: P.a.moreButton,
                          children: Object(p.jsx)(X, {
                            className: P.a.moreButtonImg,
                          }),
                        }),
                      ],
                    }),
                    Object(p.jsxs)('div', {
                      className: P.a.middleWrapper,
                      children: [
                        Object(p.jsx)('div', {
                          className: P.a.mainText,
                          children:
                            '\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544.\uac10.\uc790.\ud280.\uae40.\uc870.\uc544',
                        }),
                        [
                          'http://www.dailygaewon.com/news/photo/201906/4510_5372_5434.JPG',
                          'https://src.hidoc.co.kr/image/lib/2019/3/21/20190321174958927_0.jpg',
                        ].map(function (e) {
                          return Object(p.jsx)('img', {
                            className: P.a.mainImg,
                            src: e,
                            alt: '\uac1c\uc2dc\uae00 \uc774\ubbf8\uc9c0 \uc785\ub2c8\ub2e4.',
                          });
                        }),
                      ],
                    }),
                    Object(p.jsx)('div', {
                      className: P.a.bottomWrapper,
                      children: Object(p.jsxs)('div', {
                        className: P.a.buttonWrapper,
                        children: [
                          Object(p.jsxs)('button', {
                            className: P.a.commentButton,
                            onClick: function (e) {
                              console.log('Comment Clicked');
                            },
                            children: [
                              Object(p.jsx)(E, { className: P.a.commentImg }),
                              Object(p.jsx)('div', {
                                className: P.a.commentButtonText,
                                children: '100',
                              }),
                            ],
                          }),
                          Object(p.jsxs)('button', {
                            className: P.a.retweetButton,
                            onClick: function (e) {
                              console.log('Retweet Clicked');
                            },
                            children: [
                              Object(p.jsx)(J, { className: P.a.retweetImg }),
                              Object(p.jsx)('div', {
                                className: P.a.retweetButtonText,
                                children: '2.5k',
                              }),
                            ],
                          }),
                          Object(p.jsxs)('button', {
                            className: P.a.likeButton,
                            onClick: function (e) {
                              console.log('Like Clicked');
                            },
                            children: [
                              Object(p.jsx)(U, { className: P.a.likeImg }),
                              Object(p.jsx)('div', {
                                className: P.a.likeButtonText,
                                children: '4.5k',
                              }),
                            ],
                          }),
                          Object(p.jsx)('button', {
                            className: P.a.shareButton,
                            onClick: function (e) {
                              console.log('Share Clicked');
                            },
                            children: Object(p.jsx)(Q, {
                              className: P.a.shareImg,
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            });
          });
      var ee = function () {
        return Object(p.jsxs)('div', {
          children: [
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
            Object(p.jsx)(q, {}),
          ],
        });
      };
      var te = function () {
        return Object(p.jsx)('div', { children: 'TweetsAndReplies here' });
      };
      var re = function () {
        return Object(p.jsx)('div', { children: 'Media here' });
      };
      var ne = function () {
          return Object(p.jsx)('div', { children: 'Likes here' });
        },
        ce = r(8),
        ae = r.n(ce);
      var ie = function () {
          var e = Object(n.useState)('Tweets'),
            t = Object(v.a)(e, 2),
            r = t[0],
            c = t[1];
          return 'Tweets' == r
            ? Object(p.jsxs)('div', {
                className: ae.a.ProfilePage,
                children: [
                  Object(p.jsx)(
                    T,
                    Object(w.a)(Object(w.a)({}, r), {}, { setIsChosen: c }),
                  ),
                  Object(p.jsx)(ee, {}),
                ],
              })
            : 'TweetsAndReplies' == r
            ? Object(p.jsxs)('div', {
                className: ae.a.ProfilePage,
                children: [
                  Object(p.jsx)(
                    T,
                    Object(w.a)(Object(w.a)({}, r), {}, { setIsChosen: c }),
                  ),
                  Object(p.jsx)(te, {}),
                ],
              })
            : 'Media' == r
            ? Object(p.jsxs)('div', {
                className: ae.a.ProfilePage,
                children: [
                  Object(p.jsx)(
                    T,
                    Object(w.a)(Object(w.a)({}, r), {}, { setIsChosen: c }),
                  ),
                  Object(p.jsx)(re, {}),
                ],
              })
            : 'Likes' == r
            ? Object(p.jsxs)('div', {
                className: ae.a.ProfilePage,
                children: [
                  Object(p.jsx)(
                    T,
                    Object(w.a)(Object(w.a)({}, r), {}, { setIsChosen: c }),
                  ),
                  Object(p.jsx)(ne, {}),
                ],
              })
            : void 0;
        },
        le = r(11),
        oe = r(2);
      var se = function () {
        return Object(p.jsxs)('div', {
          className: f.a.MainBlock,
          children: [
            Object(p.jsx)(ie, {}),
            Object(p.jsx)(le.a, {
              children: Object(p.jsx)(oe.c, {
                children: Object(p.jsx)(oe.a, {
                  path: '/:id',
                  element: Object(p.jsx)(ie, {}),
                }),
              }),
            }),
            Object(p.jsx)(x, {}),
          ],
        });
      };
      var je = function () {
        return Object(p.jsxs)('div', {
          className: j.a.MainPage,
          children: [Object(p.jsx)(b, {}), Object(p.jsx)(se, {})],
        });
      };
      var de = function () {
        return Object(p.jsx)('div', { children: 'modal' });
      };
      var ue = function () {
          return Object(p.jsxs)('div', {
            className: o.a.App,
            children: [Object(p.jsx)(je, {}), Object(p.jsx)(de, {})],
          });
        },
        pe = function (e) {
          e &&
            e instanceof Function &&
            r
              .e(3)
              .then(r.bind(null, 26))
              .then(function (t) {
                var r = t.getCLS,
                  n = t.getFID,
                  c = t.getFCP,
                  a = t.getLCP,
                  i = t.getTTFB;
                r(e), n(e), c(e), a(e), i(e);
              });
        };
      i.a.render(
        Object(p.jsx)(c.a.StrictMode, { children: Object(p.jsx)(ue, {}) }),
        document.getElementById('root'),
      ),
        pe();
    },
  ],
  [[25, 1, 2]],
]);
