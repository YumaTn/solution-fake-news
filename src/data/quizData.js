export const quizData = [
  // ==========================================
  // TIN THẬT (REAL NEWS) - ID: 1 -> 10
  // ==========================================
  {
    id: 1,
    content: "Một nghiên cứu của Massachusetts Institute of Technology năm 2018 đã phân tích khoảng 126,000 tin tức được đăng trên Twitter từ năm 2006 đến 2017. Kết quả cho thấy fake news lan nhanh hơn real news khoảng 6 lần và có khả năng được chia sẻ lại cao hơn 70%.",
    isTrue: true,
    requiredKeywords: ["Massachusetts Institute of Technology", "126,000", "6 lần", "70%"],
    fakeKeywords: ["năm 2018", "trên Twitter", "từ năm 2006", "chia sẻ lại"],
    hint: "Tìm tên viện công nghệ lớn, số lượng tin tức phân tích và các con số thống kê tỷ lệ lan truyền.",
    note: "Tin Thật từ MIT cung cấp số liệu chính xác chứng minh tin giả có tốc độ bùng nổ và lan tỏa vượt trội tin thật.",
    url: "https://mitsloan.mit.edu/ideas-made-to-matter/study-false-news-spreads-faster-truth"
  },
  {
    id: 2,
    content: "Một nghiên cứu của Stanford University với 7,804 học sinh và sinh viên tại Mỹ cho thấy nhiều người gặp khó khăn khi phân biệt tin giả và tin thật trên internet. Khoảng 82% học sinh cấp hai không nhận ra bài viết quảng cáo được tài trợ là quảng cáo.",
    isTrue: true,
    requiredKeywords: ["Stanford University", "7,804", "82%"],
    fakeKeywords: ["học sinh và sinh viên", "tại Mỹ", "phân biệt tin giả", "quảng cáo được tài trợ"],
    hint: "Tìm tên trường đại học, số lượng mẫu khảo sát và tỷ lệ phần trăm học sinh không nhận biết được quảng cáo.",
    note: "Nghiên cứu của Stanford cảnh báo về lỗ hổng lớn trong kỹ năng thẩm định thông tin số của học sinh hiện nay.",
    url: "https://www.glamour.com/story/stanford-study-students-real-fake-news"
  },
  {
    id: 3,
    content: "Một nghiên cứu được công bố trên tạp chí Science bởi các nhà nghiên cứu của MIT cho thấy con người, chứ không phải bot, là nguyên nhân chính khiến fake news lan truyền mạnh trên mạng xã hội. Các nhà nghiên cứu phân tích hơn 4.5 triệu tweet từ khoảng 3 triệu người dùng.",
    isTrue: true,
    requiredKeywords: ["Science", "con người, chứ không phải bot", "4.5 triệu", "3 triệu"],
    fakeKeywords: ["nhà nghiên cứu của MIT", "nguyên nhân chính", "mạng xã hội", "người dùng"],
    hint: "Tìm tên tạp chí khoa học uy tín, chủ thể cốt lõi làm lan truyền tin và số lượng tweet/người dùng.",
    note: "Nghiên cứu trên tạp chí Science chứng minh chính hành vi và cảm xúc của con người thúc đẩy tin giả, chứ không phải do robot tự động.",
    url: "https://ide.mit.edu/insights/the-truth-about-false-news/"
  },
  {
    id: 4,
    content: "Một nghiên cứu về misinformation năm 2020 cho thấy việc cung cấp thông tin đúng và fact-checking có thể làm giảm số người tin vào fake news trên mạng xã hội. Nghiên cứu tập trung vào cách “truth campaigners” giúp giảm ảnh hưởng của tin giả trong cộng đồng online.",
    isTrue: true,
    requiredKeywords: ["misinformation năm 2020", "fact-checking", "truth campaigners"],
    fakeKeywords: ["thông tin đúng", "giảm số người tin", "mạng xã hội", "cộng đồng online"],
    hint: "Tìm năm nghiên cứu về tin sai lệch, công cụ đối phó thông tin và nhóm người bảo vệ sự thật.",
    note: "Tin Thật khẳng định các chiến dịch lan tỏa sự thật và hoạt động xác thực thông tin đem lại hiệu quả thực tế.",
    url: "https://arxiv.org/abs/2011.04857"
  },
  {
    id: 5,
    content: "Một nghiên cứu quốc tế năm 2021 về quá trình fake news phát triển cho thấy nhiều tin giả bắt đầu từ thông tin thật nhưng bị chỉnh sửa hoặc bóp méo dần trong quá trình lan truyền trên internet. Nghiên cứu đã theo dõi khoảng 950 cặp bài viết thật và giả.",
    isTrue: true,
    requiredKeywords: ["quốc tế năm 2021", "bị chỉnh sửa hoặc bóp méo", "950 cặp bài viết"],
    fakeKeywords: ["quá trình phát triển", "thông tin thật", "lan truyền", "trên internet"],
    hint: "Tìm mốc thời gian nghiên cứu toàn cầu, cách thức thông tin bị biến đổi và số lượng mẫu đối chứng.",
    note: "Tin thật thường chỉ ra thủ đoạn tinh vi của tin giả: mượn một phần sự thật rồi cắt xén, bóp méo để đánh lừa người đọc.",
    url: "https://arxiv.org/abs/2103.05944"
  },
  {
    id: 6,
    content: "Một nghiên cứu năm 2018 về Twitter tại Nhật Bản và Weibo tại Trung Quốc cho thấy fake news có cách lan truyền khác với real news ngay từ những giờ đầu tiên sau khi được đăng tải. Điều này giúp các nhà nghiên cứu phát triển công cụ phát hiện fake news sớm hơn.",
    isTrue: true,
    requiredKeywords: ["Twitter tại Nhật Bản", "Weibo tại Trung Quốc", "những giờ đầu tiên"],
    fakeKeywords: ["nghiên cứu năm 2018", "được đăng tải", "nhà nghiên cứu", "công cụ phát hiện"],
    hint: "Tìm hai quốc gia châu Á có nền tảng mạng xã hội được phân tích và thời điểm vàng giúp nhận diện hành vi lan truyền.",
    note: "Hành vi chia sẻ tin giả tạo ra các mô hình đồ thị khác biệt ngay từ đầu, hỗ trợ đắc lực cho các thuật toán quét tin giả tự động.",
    url: "https://arxiv.org/abs/1803.03443"
  },
  {
    id: 7,
    content: "Một bài nghiên cứu được nhắc lại bởi MIT Media Lab cho thấy fake news thường gây cảm xúc mạnh như sợ hãi, bất ngờ hoặc tức giận, khiến người dùng dễ chia sẻ hơn so với thông tin bình thường.",
    isTrue: true,
    requiredKeywords: ["MIT Media Lab", "sợ hãi, bất ngờ hoặc tức giận"],
    fakeKeywords: ["bài nghiên cứu", "cảm xúc mạnh", "người dùng", "thông tin bình thường"],
    hint: "Tìm tên đơn vị nghiên cứu truyền thông thuộc MIT và tổ hợp các trạng thái tâm lý kích thích tương tác.",
    note: "Tin giả luôn được thiết kế để thao túng tâm lý, giật gân, đánh vào nỗi sợ hoặc lòng trắc ẩn để ép người dùng bấm nút chia sẻ.",
    url: "https://www.media.mit.edu/articles/fear-surprise-disgust-fake-news-spreads-faster-than-some-real-news-on-twitter/"
  },
  {
    id: 8,
    content: "Một khảo sát tại Philadelphia năm 2024 cho thấy hơn một nửa người tham gia rất lo ngại về misinformation trong bầu cử và khoảng 80% tin rằng cử tri có nguy cơ bị đánh lừa bởi fake news online.",
    isTrue: true,
    requiredKeywords: ["Philadelphia năm 2024", "hơn một nửa", "80%"],
    fakeKeywords: ["khảo sát tại", "người tham gia", "trong bầu cử", "fake news online"],
    hint: "Tìm địa danh, năm diễn ra khảo sát lo ngại về chính trị và các tỷ lệ thống kê kèm theo.",
    note: "Tin Thật phản ánh mối đe dọa trực tiếp của thông tin sai lệch lên tính minh bạch của các sự kiện chính trị và bầu cử.",
    url: "https://www.axios.com/local/philadelphia/2024/10/24/election-misinformation-survey-philly"
  },
  {
    id: 9,
    content: "Một nghiên cứu giáo dục tại Mỹ cho thấy học sinh thường đánh giá độ tin cậy của bài viết dựa trên hình ảnh hoặc số lượt tương tác thay vì kiểm tra nguồn thông tin. Điều này làm tăng nguy cơ tin vào fake news trên mạng xã hội.",
    isTrue: true,
    requiredKeywords: ["Mỹ", "hình ảnh hoặc số lượt tương tác", "thay vì kiểm tra nguồn"],
    fakeKeywords: ["nghiên cứu giáo dục", "độ tin cậy", "học sinh thường", "mạng xã hội"],
    hint: "Tìm quốc gia khảo sát học đường và các yếu tố hình thức bề nổi khiến học sinh dễ bị lừa thị giác.",
    note: "Thói quen nhìn số like, share, comment hoặc ảnh minh họa lộng lẫy để tin tưởng là lý do lớn khiến giới trẻ sập bẫy tin giả.",
    url: "https://www.teenvogue.com/story/stanford-university-study-reveals-how-many-teens-believe-fake-news"
  },
  {
    id: 10,
    content: "Các nhà nghiên cứu của MIT kết luận rằng việc dạy critical thinking và media literacy có thể giúp giảm sự lan truyền của fake news, vì người dùng sẽ biết cách kiểm tra nguồn và phân tích thông tin trước khi chia sẻ.",
    isTrue: true,
    requiredKeywords: ["critical thinking", "media literacy", "kiểm tra nguồn và phân tích"],
    fakeKeywords: ["nhà nghiên cứu của MIT", "giảm sự lan truyền", "người dùng sẽ", "trước khi chia sẻ"],
    hint: "Tìm tên 2 kỹ năng cốt lõi cần đào tạo và quy trình xử lý thông tin cá nhân bắt buộc.",
    note: "Tư duy phản biện và năng lực hiểu biết truyền thông được xem là tấm khiên vững chắc nhất bảo vệ cộng đồng mạng.",
    url: "https://mitsloan.mit.edu/ideas-made-to-matter/study-false-news-spreads-faster-truth"
  },

  // ==========================================
  // TIN GIẢ (FAKE NEWS) - ID: 11 -> 20
  // ==========================================
  {
    id: 11,
    content: "Một bài đăng lan truyền trên mạng xã hội năm 2025 cho rằng sinh viên chỉ cần xem TikTok 2 giờ mỗi ngày sẽ tăng khả năng critical thinking lên 80%, nhưng bài viết không đưa ra bất kỳ nghiên cứu khoa học hay trường đại học nào xác nhận thông tin này.",
    isTrue: false,
    requiredKeywords: ["TikTok 2 giờ", "80%", "không có nghiên cứu"],
    fakeKeywords: ["mạng xã hội", "năm 2025", "critical thinking", "trường đại học nào", "xác nhận thông tin"],
    hint: "Tìm con số quá cao, nền tảng xã hội và thiếu nguồn nghiên cứu rõ ràng.",
    note: "Tin Giả thường đưa ra tỷ lệ cải thiện phi thực tế gắn với hành vi giải trí và thiếu chứng thực khoa học."
  },
  {
    id: 12,
    content: "Một website không rõ nguồn gốc tuyên bố fake news lan truyền nhanh hơn tin thật tới 100 lần trên internet, dù không có dữ liệu nghiên cứu hay tổ chức khoa học nào chứng minh con số đó.",
    isTrue: false,
    requiredKeywords: ["100 lần", "không rõ nguồn gốc", "không có dữ liệu"],
    fakeKeywords: ["lan truyền nhanh hơn", "tin thật", "trên internet", "tổ chức khoa học", "chứng minh"],
    hint: "Tìm con số thổi phồng kịch tính và nguồn phát ngôn không xác định.",
    note: "Tin Giả thường phóng đại số liệu (100 lần so với thực tế 6 lần của MIT) nhằm mục đích câu view hoang mang."
  },
  {
    id: 13,
    content: "Một bài viết online khẳng định 95% học sinh tại Harvard không thể phân biệt được fake news và real news, nhưng không có khảo sát chính thức hoặc nghiên cứu thật từ trường đại học này.",
    isTrue: false,
    requiredKeywords: ["95% học sinh", "Harvard", "không có khảo sát chính thức"],
    fakeKeywords: ["bài viết online", "phân biệt được", "fake news và real news", "trường đại học này"],
    hint: "Chú ý đến con số áp đảo kết hợp với tên trường danh tiếng nhưng thiếu dữ liệu chứng minh gốc.",
    note: "Tin Giả rất thích mượn danh nghĩa các tổ chức uy tín toàn cầu (như Harvard) để tạo vỏ bọc tin cậy."
  },
  {
    id: 14,
    content: "Một video viral trên TikTok nói rằng học sinh chỉ cần ngủ 3 tiếng mỗi ngày vẫn có thể đạt điểm cao nếu uống nước tăng lực thường xuyên, dù điều này trái với các nghiên cứu về sức khỏe và giấc ngủ.",
    isTrue: false,
    requiredKeywords: ["3 tiếng", "nước tăng lực", "TikTok"],
    fakeKeywords: ["video viral", "đạt điểm cao", "trái với", "sức khỏe và giấc ngủ"],
    hint: "Tìm lời khuyên giật gân, cực đoan và đi ngược lại hoàn toàn với kiến thức y học căn bản.",
    note: "Tin Giả thường đưa ra những giải pháp tiêu cực nhưng cam kết kết quả thần kỳ để thu hút đối tượng trẻ tuổi."
  },
  {
    id: 15,
    content: "Một bài báo năm 2025 cho rằng chơi game 10 tiếng mỗi ngày giúp sinh viên tăng GPA nhanh chóng, nhưng không có nghiên cứu giáo dục đáng tin nào xác nhận điều đó.",
    isTrue: false,
    requiredKeywords: ["10 tiếng", "GPA nhanh chóng", "không có nghiên cứu"],
    fakeKeywords: ["bài báo năm 2025", "mỗi ngày", "chơi game", "giáo dục đáng tin", "xác nhận"],
    hint: "Tìm hành vi giải trí quá độ và lời hứa hẹn tăng điểm số bất ngờ không có căn cứ.",
    note: "Tin Giả cố tình đánh trúng tâm lý lười biếng nhưng thích thành tích cao của một bộ phận cư dân mạng."
  },
  {
    id: 16,
    content: "Một tài khoản mạng xã hội lan truyền thông tin rằng media literacy không có tác dụng trong việc giảm fake news vì “học sinh vẫn tin mọi thứ trên internet”, dù không đưa ra bằng chứng hay dữ liệu nghiên cứu.",
    isTrue: false,
    requiredKeywords: ["không có tác dụng", "media literacy", "không đưa ra bằng chứng"],
    fakeKeywords: ["mạng xã hội", "giảm fake news", "tin mọi thứ", "trên internet", "dữ liệu nghiên cứu"],
    hint: "Tìm luận điệu tiêu cực phủ nhận giáo dục một cách chủ quan, vô căn cứ.",
    note: "Tin Giả thường sử dụng các câu trích dẫn cá nhân mang tính định kiến thay vì dựa trên số liệu phân tích."
  },
  {
    id: 17,
    content: "Một bài viết trên Facebook khẳng định ánh sáng từ điện thoại không ảnh hưởng gì đến giấc ngủ của thanh tissue niên và việc dùng điện thoại suốt đêm là hoàn toàn an toàn.",
    isTrue: false,
    requiredKeywords: ["không ảnh hưởng", "suốt đêm", "Facebook"],
    fakeKeywords: ["ánh sáng", "điện thoại", "giấc ngủ", "thanh thiếu niên", "hoàn toàn an toàn"],
    hint: "Tìm khẳng định an toàn tuyệt đối mâu thuẫn trực diện với khuyến cáo của tổ chức y tế.",
    note: "Tin Giả thường đưa thông tin phản khoa học nhằm giảm bớt cảm giác tội lỗi của người dùng khi làm việc xấu."
  },
  {
    id: 18,
    content: "Một blog công nghệ đăng tin rằng AI sẽ thay thế hoàn toàn giáo viên trên toàn thế giới vào năm 2027 và học sinh sẽ không cần đến trường nữa, nhưng đây chỉ là dự đoán phóng đại không có xác nhận chính thức.",
    isTrue: false,
    requiredKeywords: ["AI sẽ thay thế", "2027", "không cần đến trường"],
    fakeKeywords: ["blog công nghệ", "toàn thế giới", "dự đoán phóng đại", "xác nhận chính thức"],
    hint: "Tìm dự báo tương lai mang tính chất viễn tưởng, giật gân và thiếu sự đồng thuận từ giới chuyên gia.",
    note: "Tin Giả thường lợi dụng chủ đề hot (như AI) để vẽ ra kịch bản đáng sợ hoặc phi thực tế nhằm gây sốc dư luận."
  },
  {
    id: 19,
    content: "Một bài đăng online tuyên bố fact-checking không hiệu quả và khiến người đọc tin fake news nhiều hơn, dù không có nghiên cứu khoa học đáng tin hỗ trợ cho nhận định này.",
    isTrue: false,
    requiredKeywords: ["không hiệu quả", "fact-checking", "không có nghiên cứu"],
    fakeKeywords: ["bài đăng online", "tin fake news", "khoa học đáng tin", "nhận định này"],
    hint: "Tìm luận điểm hạ thấp công cụ kiểm chứng nhưng trống rỗng về bằng chứng học thuật.",
    note: "Tin Giả thường tìm cách hạ bệ uy tín của các hệ thống kiểm tra sự thật nhằm bảo vệ không gian sống của chúng."
  },
  {
    id: 20,
    content: "Một video trên social media cho rằng tập thể dục làm học sinh mệt mỏi hơn và giảm khả năng học tập tới 50%, nhưng không có nghiên cứu sức khỏe hay giáo dục nào xác nhận thông tin này.",
    isTrue: false,
    requiredKeywords: ["50%", "tập thể dục", "không có nghiên cứu"],
    fakeKeywords: ["social media", "mệt mỏi hơn", "khả năng học tập", "giáo dục nào"],
    hint: "Tìm tỷ lệ phần trăm sụt giảm kịch tính đi kèm với kết luận đi ngược khoa học thể chất.",
    note: "Tin Giả bóp méo tác dụng của các hoạt động lành mạnh thông qua các số liệu tự bịa."
  }
];