# interview

master 分支已设置为 `保护分支`, 直接 `push origin master` 会失败，
正确做法为: 建立一个新分支， `push` 后执行 `merge request`, 合并后会自动删除远程仓库中已合并的分支。