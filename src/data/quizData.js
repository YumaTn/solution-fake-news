export const quizData = [
  {
    id: 10,
    content: "Một nghiên cứu sức khỏe tại Anh năm 2020 cho thấy thanh thiếu niên và sinh viên tập thể dục thường xuyên có mức căng thẳng và lo âu thấp hơn so với nhóm ít vận động.",
    isTrue: true,
    requiredKeywords: ["Anh", "2020", "tập thể dục thường xuyên", "căng thẳng"],
    hint: "Tìm kết quả so sánh giữa mức vận động và mức lo âu, căng thẳng.",
    note: "Tin Thật thường liên kết hoạt động lành mạnh với sức khỏe tinh thần qua dữ liệu nghiên cứu."
  },
  {
    id: 3,
    content: "Một nghiên cứu của Stanford University với hơn 7,800 học sinh và sinh viên cho thấy nhiều người gặp khó khăn trong việc phân biệt bài quảng cáo được tài trợ và bài báo thật trên internet.",
    isTrue: true,
    requiredKeywords: ["Stanford University", "7,800", "quảng cáo được tài trợ"],
    hint: "Tìm tên trường đại học uy tín, kích thước mẫu và vấn đề được nêu rõ.",
    note: "Tin Thật thường có nguồn học thuật, lượng mẫu cụ thể và mô tả rõ vấn đề."
  },
  {
    id: 15,
    content: "Một bài báo giả năm 2025 cho rằng chơi game 10 tiếng mỗi ngày giúp sinh viên tăng GPA nhanh chóng, nhưng không có nghiên cứu giáo dục đáng tin nào xác nhận điều đó.",
    isTrue: false,
    requiredKeywords: ["10 tiếng", "GPA nhanh chóng", "không có nghiên cứu"],
    hint: "Tìm lời hứa phi thực tế và thiếu nghiên cứu xác nhận.",
    note: "Tin Giả thường kết nối hành vi không lành mạnh với kết quả học tập bất ngờ."
  },
  {
    id: 1,
    content: "Một nghiên cứu được đăng trên ResearchGate năm 2023 tại Mỹ cho thấy sinh viên có kỹ năng critical thinking và media literacy nhận diện fake news tốt hơn khoảng 38% so với nhóm ít được đào tạo về kiểm chứng thông tin.",
    isTrue: true,
    requiredKeywords: ["ResearchGate", "2023", "38%"],
    hint: "Tìm nguồn nghiên cứu rõ ràng, năm và con số cải thiện cụ thể.",
    note: "Tin Thật thường nêu rõ nền tảng nghiên cứu, thời gian và mức cải thiện có số liệu."
  },
  {
    id: 19,
    content: "Một bài đăng online tuyên bố fact-checking không hiệu quả và khiến người đọc tin fake news nhiều hơn, dù không có nghiên cứu khoa học đáng tin hỗ trợ cho nhận định này.",
    isTrue: false,
    requiredKeywords: ["không hiệu quả", "fact-checking", "không có nghiên cứu"],
    hint: "Tìm luận điểm phủ nhận fact-checking nhưng thiếu nghiên cứu hỗ trợ.",
    note: "Tin Giả thường gắn mác khoa học vào tuyên bố thiếu bằng chứng."
  },
  {
    id: 8,
    content: "Từ năm 2024 đến 2026, nhiều trường học trên thế giới bắt đầu sử dụng AI để hỗ trợ học sinh trong việc học ngoại ngữ, tóm tắt bài học và luyện kỹ năng viết.",
    isTrue: true,
    requiredKeywords: ["2024 đến 2026", "AI", "học ngoại ngữ", "tóm tắt bài học"],
    hint: "Tìm xu hướng toàn cầu, năm và ứng dụng AI trong giáo dục cụ thể.",
    note: "Tin Thật thường mô tả xu hướng với năm rõ ràng và các ứng dụng thực tế."
  },
  {
    id: 14,
    content: "Một video viral trên TikTok nói rằng học sinh chỉ cần ngủ 3 tiếng mỗi ngày vẫn có thể đạt điểm cao nếu uống nước tăng lực thường xuyên, dù điều này trái với các nghiên cứu về sức khỏe và giấc ngủ.",
    isTrue: false,
    requiredKeywords: ["3 tiếng", "nước tăng lực", "TikTok"],
    hint: "Tìm lời khuyên giật gân trái với kiến thức sức khỏe cơ bản.",
    note: "Tin Giả thường dùng lời khuyên cực đoan và mâu thuẫn với khoa học."
  },
  {
    id: 7,
    content: "Một nghiên cứu tại Trung Quốc năm 2024 cho thấy việc sử dụng điện thoại quá nhiều trước khi ngủ có thể làm giảm chất lượng giấc ngủ và khiến học sinh khó tập trung hơn vào ngày hôm sau.",
    isTrue: true,
    requiredKeywords: ["Trung Quốc", "2024", "chất lượng giấc ngủ", "tập trung"],
    hint: "Tìm thông tin nghiên cứu về điện thoại trước khi ngủ và ảnh hưởng đến tập trung.",
    note: "Tin Thật thường liên kết hành vi cụ thể với hậu quả sức khỏe rõ ràng."
  },
  {
    id: 11,
    content: "Một bài đăng lan truyền trên mạng xã hội năm 2025 cho rằng sinh viên chỉ cần xem TikTok 2 giờ mỗi ngày sẽ tăng khả năng critical thinking lên 80%, nhưng bài viết không đưa ra bất kỳ nghiên cứu khoa học hay trường đại học nào xác nhận thông tin này.",
    isTrue: false,
    requiredKeywords: ["TikTok 2 giờ", "80%", "không có nghiên cứu"],
    hint: "Tìm con số quá cao, nền tảng xã hội và thiếu nguồn nghiên cứu rõ ràng.",
    note: "Tin Giả thường đưa ra tỷ lệ phi thực tế và thiếu chứng thực từ tổ chức khoa học."
  },
  {
    id: 4,
    content: "Một nghiên cứu giáo dục tại Mỹ năm 2022 cho thấy học sinh ngủ đủ khoảng 8 tiếng mỗi ngày thường có khả năng tập trung và kết quả học tập tốt hơn nhóm thường xuyên thiếu ngủ.",
    isTrue: true,
    requiredKeywords: ["2022", "8 tiếng", "tập trung"],
    hint: "Tìm năm nghiên cứu, thời lượng ngủ và kết quả học tập được so sánh.",
    note: "Tin Thật thường liên kết thói quen sinh hoạt với hiệu quả học tập và có thông tin thời gian cụ thể."
  },
  {
    id: 20,
    content: "Một video trên social media cho rằng tập thể dục làm học sinh mệt mỏi hơn và giảm khả năng học tập tới 50%, nhưng không có nghiên cứu sức khỏe hay giáo dục nào xác nhận thông tin này.",
    isTrue: false,
    requiredKeywords: ["50%", "tập thể dục", "không có nghiên cứu"],
    hint: "Tìm con số kịch tính và thiếu nghiên cứu xác nhận.",
    note: "Tin Giả thường dùng tỷ lệ lớn để gây hoang mang mà không có bằng chứng."
  },
  {
    id: 2,
    content: "Năm 2018, các nhà nghiên cứu từ Massachusetts Institute of Technology đã phân tích hơn 126,000 tin tức trên Twitter và phát hiện rằng fake news lan truyền nhanh hơn tin thật khoảng 6 lần trên mạng xã hội.",
    isTrue: true,
    requiredKeywords: ["Massachusetts Institute of Technology", "126,000", "6 lần"],
    hint: "Chú ý đến tổ chức nghiên cứu nổi tiếng và dữ liệu phân tích cụ thể.",
    note: "Tin Thật thường nêu rõ tổ chức nghiên cứu, mẫu dữ liệu và so sánh có căn cứ."
  },
  {
    id: 13,
    content: "Một bài viết online khẳng định 95% học sinh tại Harvard không thể phân biệt được fake news và real news, nhưng không có khảo sát chính thức hoặc nghiên cứu thật từ trường đại học này.",
    isTrue: false,
    requiredKeywords: ["95% học sinh", "Harvard", "không có khảo sát chính thức"],
    hint: "Chú ý đến con số lớn với tên trường danh tiếng nhưng thiếu khảo sát chính thức.",
    note: "Tin Giả thường mượn tên tổ chức lớn để tăng độ tin cậy mà không có bằng chứng."
  },
  {
    id: 6,
    content: "Một chương trình media literacy tại châu Âu năm 2023 cho thấy học sinh được học cách kiểm tra nguồn tin và fact-check có khả năng nhận diện misinformation tốt hơn đáng kể.",
    isTrue: true,
    requiredKeywords: ["châu Âu", "2023", "media literacy", "fact-check"],
    hint: "Tìm ra chương trình truyền thông, năm và kết quả cải thiện cụ thể.",
    note: "Tin Thật thường nhấn mạnh chương trình giáo dục rõ ràng và kết quả có thể đo lường được."
  },
  {
    id: 18,
    content: "Một blog công nghệ đăng tin rằng AI sẽ thay thế hoàn toàn giáo viên trên toàn thế giới vào năm 2027 và học sinh sẽ không cần đến trường nữa, nhưng đây chỉ là dự đoán phóng đại không có xác nhận chính thức.",
    isTrue: false,
    requiredKeywords: ["AI sẽ thay thế", "2027", "không cần đến trường"],
    hint: "Tìm dự đoán quá mức và thiếu xác nhận chính thức.",
    note: "Tin Giả thường phóng đại tương lai công nghệ để gây xôn xao."
  },
  {
    id: 5,
    content: "Tại Indonesia năm 2025, một nghiên cứu với khoảng 80 sinh viên đại học cho thấy nhóm chơi thể thao thường xuyên trong 8 tuần có mức tập trung và điểm GPA cao hơn nhóm không tham gia hoạt động thể chất.",
    isTrue: true,
    requiredKeywords: ["Indonesia", "2025", "80 sinh viên", "8 tuần"],
    hint: "Chú ý quốc gia, quy mô mẫu và thời gian thử nghiệm cụ thể.",
    note: "Tin Thật thường nêu rõ địa điểm nghiên cứu, quy mô và kết quả so sánh."
  },
  {
    id: 12,
    content: "Một website không rõ nguồn gốc tuyên bố fake news lan truyền nhanh hơn tin thật tới 100 lần trên internet, dù không có dữ liệu nghiên cứu hay tổ chức khoa học nào chứng minh con số đó.",
    isTrue: false,
    requiredKeywords: ["100 lần", "không rõ nguồn gốc", "không có dữ liệu"],
    hint: "Tìm con số phi thực tế và nguồn tin không xác định.",
    note: "Tin Giả thường thổi phồng số liệu và không cung cấp bằng chứng khoa học."
  },
  {
    id: 17,
    content: "Một bài viết trên Facebook khẳng định ánh sáng từ điện thoại không ảnh hưởng gì đến giấc ngủ của thanh thiếu niên và việc dùng điện thoại suốt đêm là hoàn toàn an toàn.",
    isTrue: false,
    requiredKeywords: ["không ảnh hưởng", "suốt đêm", "Facebook"],
    hint: "Tìm tuyên bố an toàn tuyệt đối mâu thuẫn với kiến thức sức khỏe cơ bản.",
    note: "Tin Giả thường bác bỏ bằng chứng sức khỏe bằng tuyên bố tổng quát."
  },
  {
    id: 16,
    content: "Một tài khoản mạng xã hội lan truyền thông tin rằng media literacy không có tác dụng trong việc giảm fake news vì “học sinh vẫn tin mọi thứ trên internet”, dù không đưa ra bằng chứng hay dữ liệu nghiên cứu.",
    isTrue: false,
    requiredKeywords: ["không có tác dụng", "media literacy", "không đưa ra bằng chứng"],
    hint: "Tìm luận điệu phủ nhận giáo dục mà không có dữ liệu hỗ trợ.",
    note: "Tin Giả thường tạo luận điểm phản trực giác rồi bỏ qua bằng chứng."
  }
];  