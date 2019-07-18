import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: Blog[];

  newsArticles: News[];

  constructor(private newsService: NewsService) { 

    //temporary
    this.blogs = [
      {
        id: 1,
        title: 'Kawhi Leonard decision reportedly down to the Lakers or Raptors',
        body: 'As several key players chose their new destinations for 2019 and beyond ' 
              + 'in the first two days of NBA free agency, 2019 NBA Finals MVP Kawhi Leonard ' 
              + 'has yet to make his decision. The Los Angeles Clippers were the favorites to land him '
              + 'for most of the season, but as the Toronto Raptors came closer to capturing the title ' 
              + 'many executives around the league speculated that Leonard may very well re-sign with ' 
              + 'Toronto. The latest rumors, however, suggest that the Los Angeles Lakers are the ' 
              + 'frontrunners to sign the two-way superstar. Keep in mind that after Leonard requested '
              + 'a trade from the San Antonio Spurs last summer, his preferred destination was the Lakers. '
              + 'If the Lakers indeed sign Leonard to a four-year maximum contract, they will presumably '
              + 'be the favorites to win the 2020 NBA Championship behind a big three of Leonard, Lebron James '
              + 'and the newly-acquired Anthony Davis. If Leonard re-signs with Toronto, the Raptors will again '
              + 'be a championship contender in the East, while the Lakers will have to fill the remainder of '
              + 'their roster with shooters and role players, which are in limited supply. Many wonder how the '
              + 'Raptors fanbase will react if their finals MVP departs for his hometown Lakers in southern '
              + 'California. Leonard has arguably claimed himself as the greatest Toronto Raptor in their '
              + '24-year history after bringing them the championship they sought after years of playoff heartbreak. '
              + 'He does not owe, if thats the right term, the Raptors franchise anything even if he joins the Lakers '
              + 'to form another superteam. Come later tonight or this week, Leonard\'s decision will impact '
              + 'the landscape of the league for the next three or four years.',
      newsID: 1
      },
      {
        id: 2,
        title: 'Awake: The Million Dollar Game showcases a fascinating concept but could use some tinkering.',
        body: 'I\'ll admit it. I\'m not a TV show guy, but this summer I\'ve been watching more netflix than '
              + 'usual. Usually I open the app on my phone or laptop just to see what new or old shows might be '
              + 'interesting to me. And that\'s how I found out about this game show called \'Awake: The Million '
              + 'Dollar Game\'. It happened to be featured on the front cover of netflix, so that part already '
              + 'intrigued me. But the concept of staying awake for 24 hours counting quarters and then '
              + 'sleepwalking your way through challenges was...definitely something I haven\'t seen before. '
              + 'I\'ve stayed up for a few hackathons but that\'s the closest I\'ve come to experiencing '
              + 'this TV Show\'s concept. After finishing all 8 episodes a few days ago (spoiler alert: ' 
              + 'no one won a million dollars), I thought the show had a good start but needed more features '
              + 'to entice viewers to watch more seasons of the show. For the most part I liked the James Davis, '
              + 'who proved to be a funny and energetic host, as well as an ideal fit for a show with sleep-deprived people '
              + 'struggling through challenges. If you\'re a game theorist, I think you\'ll enjoy the heck out of '
              + 'this show, because after every challenge there\'s a 10-second stage called \'The Buyout\' where contestants '
              + 'who did not finish in first place in that challenge decide whether or not to take the money offered '
              + 'to them. The Buyout is designed to influence those who believe they placed last place in that challenge '
              + 'to take the money offered rather than risk leaving the show without any reward. These are decisions that '
              + 'combine decision-making rationality and psychology. Being sleep-deprived can mess with one\'s brain and '
              + 'force contestants to make decisions they normally would not make if they had enough sleep. Once the show '
              + 'is narrowed down to one player, the contestant must first decide whether the amount of money he or she '
              + 'counted is within $500 dollars of the actual amount (above or below). If it is, then he wins the \'Big Bank\' '
              + 'the combined total amount of money counted by all players. If not, the contestant leaves with nothing. The '
              + 'final decision is definitely the most nervewracking, because the contestant must decide whether or not his count of his money '
              + 'is within $25 dollars of the actual count. If so, the contestant wins the ultimate prize of one million dollars. '
              + 'Otherwise, the contestant leaves with nothing. At this stage, contestants are often enticed to keep the '
              + 'big bank because of the severe increase in constraint and consequence. Decreasing the range from $500 to '
              + '$25 is a big jump (specifically 20 times less) between two decisions, which can decrease the contestant\'s confidence. '
              + 'Furthermore, if the contestant guesses wrong, he can go from at least 120,000 to 195,000 dollars to nothing. '
              + 'The challenges and decision-making moments intrigued me every episode, but the process felt sort of redundant. '
              + 'The show was still missing an element, or even a few elements. Maybe the producers of the show can take note '
              + 'of other famous game shows and see what features these shows have that take them over the top. One suggestion '
              + 'I have is adding tiebreaker challenges rather than using a factor like time to break the tie. However, this isn\'t as '
              + 'intuitive as a simple tiebreaker and it would only leave all the remaining contestants further sleep-deprived.' 
              + 'I\'m not sure this has already been included, but during the quarter counting they can serve contestants with bigger meals '
              + 'rather than some lightweight snacks or energy bars. At the same time, eating heavier meals during the day can put '
              + 'people to sleep, especially during lunch. ',
        newsID: 2
      }
    ]
    
    this.newsArticles = [];

  }

  ngOnInit() {
    this.getUSNews();
  }

  getUSNews(){
    this.newsService.getTrendingNewsByCountry('us').subscribe((res: any) => {
      for(let i = 0; i < res.articles.length; i++){
        let article = res.articles[i];
        this.newsArticles.push({
          title: article.title,
          source: article.source.name,
          url: article.url,
          author: article.author,
          publishedAt: new Date(article.publishedAt).toString()
        });
      }
    })
  }

}
